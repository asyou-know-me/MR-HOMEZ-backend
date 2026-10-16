import {
  eq,
} from "drizzle-orm";

import AdminRepository
  from "../../domain/admin/AdminRepository.js";

import {
  db,
} from "../database/db.js";

import {
  admins,
} from "../database/schema.js";


class PostgresAdminRepository
  extends AdminRepository {

  async create(data) {
    const [admin] =
      await db
        .insert(admins)
        .values(data)
        .returning();

    return admin;
  }


  async findByEmail(email) {
    const [admin] =
      await db
        .select()
        .from(admins)
        .where(
          eq(
            admins.email,
            email.toLowerCase()
          )
        );

    return admin || null;
  }


  async findById(id) {
    const [admin] =
      await db
        .select()
        .from(admins)
        .where(
          eq(
            admins.id,
            Number(id)
          )
        );

    return admin || null;
  }
}


export default PostgresAdminRepository;