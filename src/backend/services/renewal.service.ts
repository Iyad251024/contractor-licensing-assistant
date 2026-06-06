import { applicationRepo } from "../db/repositories/application.repo";
import { getRules } from "./rules-engine.service";
import { Errors } from "../utils/errors";

export const renewalService = {
  async status(db: D1Database, userId: string) {
    const app = await applicationRepo.findByUser(db, userId);
    if (!app?.license_expires_at) {
      return { hasLicense: false };
    }
    const rules = getRules();
    const expires = new Date(app.license_expires_at);
    const today = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.ceil((expires.getTime() - today.getTime()) / msPerDay);
    const reminderTriggers = rules.renewal.reminderDaysBefore
      .filter((d) => daysRemaining <= d && daysRemaining > 0)
      .sort((a, b) => a - b);

    return {
      hasLicense: true,
      licenseNumber: app.license_number,
      expiresAt: app.license_expires_at,
      daysRemaining,
      withinGrace: daysRemaining < 0 && Math.abs(daysRemaining) <= rules.renewal.graceDays,
      activeReminder: reminderTriggers[0] ?? null,
      renewalFee: rules.fees.renewal,
      lateFee: rules.fees.lateRenewal,
    };
  },

  async markRenewed(db: D1Database, userId: string, newExpiry: string) {
    const app = await applicationRepo.findByUser(db, userId);
    if (!app) throw Errors.notFound("No application found");
    await applicationRepo.update(db, app.id, { license_expires_at: newExpiry });
  },
};
