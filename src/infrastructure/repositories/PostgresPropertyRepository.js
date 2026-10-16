import {
  eq,
  and,
  or,
  ilike,
} from "drizzle-orm";

import PropertyRepository
  from "../../domain/property/PropertyRepository.js";

import {
  db,
} from "../database/db.js";

import {
  properties,
} from "../database/schema.js";


class PostgresPropertyRepository
  extends PropertyRepository {

  /* =========================================================
     CREATE
  ========================================================= */

  async create(propertyData) {
    const [createdProperty] =
      await db
        .insert(properties)
        .values(propertyData)
        .returning();

    return createdProperty;
  }


  /* =========================================================
     GET ALL + FILTERS
  ========================================================= */

  async findAll(filters = {}) {
    const {
      search,
      city,
      propertyType,
      listingType,
      featured,
      status,
    } = filters;


    const conditions = [];


    /* =====================================================
       GENERAL SEARCH

       Searches across:
       - title
       - city
       - locality
       - address
    ===================================================== */

    if (
      search &&
      search.trim() !== ""
    ) {
      const searchValue =
        `%${search.trim()}%`;


      conditions.push(
        or(
          ilike(
            properties.title,
            searchValue
          ),

          ilike(
            properties.city,
            searchValue
          ),

          ilike(
            properties.locality,
            searchValue
          ),

          ilike(
            properties.address,
            searchValue
          )
        )
      );
    }


    /* =====================================================
       CITY
    ===================================================== */

    if (
      city &&
      city.trim() !== ""
    ) {
      conditions.push(
        ilike(
          properties.city,
          city.trim()
        )
      );
    }


    /* =====================================================
       PROPERTY TYPE
    ===================================================== */

    if (
      propertyType &&
      propertyType.trim() !== ""
    ) {
      conditions.push(
        eq(
          properties.propertyType,
          propertyType.trim()
            .toLowerCase()
        )
      );
    }


    /* =====================================================
       LISTING TYPE
    ===================================================== */

    if (
      listingType &&
      listingType.trim() !== ""
    ) {
      conditions.push(
        eq(
          properties.listingType,
          listingType.trim()
            .toLowerCase()
        )
      );
    }


    /* =====================================================
       FEATURED
    ===================================================== */

    if (
      featured !== undefined &&
      featured !== ""
    ) {
      conditions.push(
        eq(
          properties.featured,
          featured === "true"
        )
      );
    }


    /* =====================================================
       STATUS
    ===================================================== */

    if (
      status &&
      status.trim() !== ""
    ) {
      conditions.push(
        eq(
          properties.status,
          status.trim()
            .toLowerCase()
        )
      );
    }


    /* =====================================================
       NO FILTERS
    ===================================================== */

    if (conditions.length === 0) {
      return await db
        .select()
        .from(properties);
    }


    /* =====================================================
       FILTERED QUERY
    ===================================================== */

    return await db
      .select()
      .from(properties)
      .where(
        and(...conditions)
      );
  }


  /* =========================================================
     GET BY ID
  ========================================================= */

  async findById(id) {
    const [property] =
      await db
        .select()
        .from(properties)
        .where(
          eq(
            properties.id,
            Number(id)
          )
        );

    return property || null;
  }


  /* =========================================================
     UPDATE
  ========================================================= */

  async update(id, propertyData) {
    const [updatedProperty] =
      await db
        .update(properties)
        .set({
          ...propertyData,

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            properties.id,
            Number(id)
          )
        )
        .returning();

    return updatedProperty;
  }


  /* =========================================================
     DELETE
  ========================================================= */

  async delete(id) {
    const [deletedProperty] =
      await db
        .delete(properties)
        .where(
          eq(
            properties.id,
            Number(id)
          )
        )
        .returning();

    return deletedProperty;
  }
}


export default PostgresPropertyRepository;