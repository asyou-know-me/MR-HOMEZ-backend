import "dotenv/config";

import bcrypt from "bcryptjs";

import { db } from "../src/infrastructure/database/db.js";

import { admins } from "../src/infrastructure/database/schema.js";

import { eq } from "drizzle-orm";

const createAdmin = async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin environment variables are missing");
    }

    const normalizedEmail = ADMIN_EMAIL.trim().toLowerCase();

    const [existingAdmin] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, normalizedEmail));

    if (existingAdmin) {
      console.log("Admin already exists");

      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const [admin] = await db
      .insert(admins)
      .values({
        name: ADMIN_NAME,

        email: normalizedEmail,

        passwordHash,

        role: "admin",

        active: true,
      })
      .returning();

    console.log("Admin created successfully:", admin.email);

    process.exit(0);
  } catch (error) {
    console.error("Create admin error:", error);

    process.exit(1);
  }
};

createAdmin();
