import { desc, eq } from "drizzle-orm";

import { db } from "../database/db.js";

import { enquiries } from "../database/schema.js";

class EnquiryRepository {
  async create(data) {
    const [enquiry] = await db.insert(enquiries).values(data).returning();

    return enquiry;
  }

  async findAll() {
    return await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
  }

  async updateStatus(id, status) {
    const [enquiry] = await db
      .update(enquiries)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(enquiries.id, Number(id)))
      .returning();

    return enquiry;
  }

  async delete(id) {
    const [enquiry] = await db
      .delete(enquiries)
      .where(eq(enquiries.id, Number(id)))
      .returning();

    return enquiry;
  }
}

export default EnquiryRepository;
