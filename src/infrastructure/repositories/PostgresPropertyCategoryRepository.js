import {
  eq,
  asc,
} from "drizzle-orm";

import PropertyCategoryRepository
  from "../../domain/category/PropertyCategoryRepository.js";

import {
  db,
} from "../database/db.js";

import {
  propertyCategories,
} from "../database/schema.js";


class PostgresPropertyCategoryRepository
  extends PropertyCategoryRepository {

  async create(data) {
    const [category] =
      await db
        .insert(propertyCategories)
        .values(data)
        .returning();

    return category;
  }


  async findAll(filters = {}) {
    const {
      active,
    } = filters;


    if (
      active === "true" ||
      active === "false"
    ) {
      return await db
        .select()
        .from(propertyCategories)
        .where(
          eq(
            propertyCategories.active,
            active === "true"
          )
        )
        .orderBy(
          asc(
            propertyCategories.displayOrder
          )
        );
    }


    return await db
      .select()
      .from(propertyCategories)
      .orderBy(
        asc(
          propertyCategories.displayOrder
        )
      );
  }


  async findById(id) {
    const [category] =
      await db
        .select()
        .from(propertyCategories)
        .where(
          eq(
            propertyCategories.id,
            Number(id)
          )
        );

    return category || null;
  }


  async update(id, data) {
    const [category] =
      await db
        .update(propertyCategories)
        .set({
          ...data,

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            propertyCategories.id,
            Number(id)
          )
        )
        .returning();

    return category;
  }


  async delete(id) {
    const [category] =
      await db
        .delete(propertyCategories)
        .where(
          eq(
            propertyCategories.id,
            Number(id)
          )
        )
        .returning();

    return category;
  }
}


export default PostgresPropertyCategoryRepository;