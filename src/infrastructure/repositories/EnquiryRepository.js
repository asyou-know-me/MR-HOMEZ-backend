import { desc, eq, getTableColumns } from "drizzle-orm";

import { db } from "../database/db.js";

import { enquiries, properties, projects } from "../database/schema.js";

class EnquiryRepository {
  async create(data) {
    const [enquiry] = await db.insert(enquiries).values(data).returning();

    return enquiry;
  }

  async findAll() {
    return await db
      .select({
        ...getTableColumns(enquiries),
        propertyTitle: properties.title,
        projectName: projects.name,
      })
      .from(enquiries)
      .leftJoin(properties, eq(enquiries.propertyId, properties.id))
      .leftJoin(projects, eq(enquiries.projectId, projects.id))
      .orderBy(desc(enquiries.createdAt));
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
