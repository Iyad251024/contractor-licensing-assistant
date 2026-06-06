export const billingRepo = {
  async recordEvent(
    db: D1Database,
    id: string,
    stripeEventId: string,
    eventType: string,
    userId: string | null,
    payload: unknown,
  ): Promise<boolean> {
    try {
      await db
        .prepare(
          `INSERT INTO billing_events (id, user_id, stripe_event_id, event_type, payload)
           VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(id, userId, stripeEventId, eventType, JSON.stringify(payload))
        .run();
      return true;
    } catch (e: any) {
      // duplicate stripe_event_id → idempotent skip
      if (String(e?.message ?? "").includes("UNIQUE")) return false;
      throw e;
    }
  },
};
