import { eq, asc, and, inArray } from "drizzle-orm";

import PropertyImageRepository from "../../domain/property/PropertyImageRepository.js";

import { db } from "../database/db.js";

import { propertyImages } from "../database/schema.js";

class PostgresPropertyImageRepository extends PropertyImageRepository {
  /* CREATE */

  async create(imageData) {
    const [image] = await db
      .insert(propertyImages)
      .values(imageData)
      .returning();

    return image;
  }

  /* GET IMAGES BY PROPERTY */

  async findByPropertyId(propertyId) {
    return await db
      .select()
      .from(propertyImages)
      .where(eq(propertyImages.propertyId, Number(propertyId)))
      .orderBy(asc(propertyImages.displayOrder));
  }

  /* GET IMAGE BY ID */

  async findById(id) {
    const [image] = await db
      .select()
      .from(propertyImages)
      .where(eq(propertyImages.id, Number(id)));
    return image || null;
  }

  /* DELETE */

  async delete(id) {
    const [image] = await db
      .delete(propertyImages)
      .where(eq(propertyImages.id, Number(id))).returning();

      return image;
  }

  async findPrimaryByPropertyIds(
  propertyIds
) {
  if (
    !propertyIds ||
    propertyIds.length === 0
  ) {
    return [];
  }

  return await db
    .select()
    .from(propertyImages)
    .where(
      and(
        inArray(
          propertyImages.propertyId,
          propertyIds
        ),

        eq(
          propertyImages.isPrimary,
          true
        )
      )
    );
}
}

export default PostgresPropertyImageRepository;
