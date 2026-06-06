import type { User, PlanType, SubscriptionStatus } from "../../types/user";

export const userRepo = {
  async create(
    db: D1Database,
    u: Pick<User, "id" | "email" | "password_hash" | "name" | "jurisdiction">,
  ): Promise<User> {
    await db
      .prepare(
        `INSERT INTO users (id, email, password_hash, name, jurisdiction)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(u.id, u.email, u.password_hash, u.name, u.jurisdiction)
      .run();
    return (await this.findById(db, u.id))!;
  },

  async findById(db: D1Database, id: string): Promise<User | null> {
    return db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first<User>();
  },

  async findByEmail(db: D1Database, email: string): Promise<User | null> {
    return db
      .prepare("SELECT * FROM users WHERE email = ?")
      .bind(email.toLowerCase())
      .first<User>();
  },

  async findByStripeCustomer(db: D1Database, customerId: string): Promise<User | null> {
    return db
      .prepare("SELECT * FROM users WHERE stripe_customer_id = ?")
      .bind(customerId)
      .first<User>();
  },

  async setStripeCustomer(db: D1Database, userId: string, customerId: string) {
    await db
      .prepare("UPDATE users SET stripe_customer_id = ? WHERE id = ?")
      .bind(customerId, userId)
      .run();
  },

  async setSubscription(
    db: D1Database,
    userId: string,
    subscriptionId: string | null,
    status: SubscriptionStatus,
    plan: PlanType,
  ) {
    await db
      .prepare(
        `UPDATE users
         SET stripe_subscription_id = ?, subscription_status = ?, plan_type = ?
         WHERE id = ?`,
      )
      .bind(subscriptionId, status, plan, userId)
      .run();
  },
};
