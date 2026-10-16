import {
  eq,
  asc,
  and,
  inArray,
} from "drizzle-orm";

import ProjectImageRepository from "../../domain/project/ProjectImageRepository.js";

import { db } from "../database/db.js";

import {
  projectImages,
} from "../database/schema.js";


class PostgresProjectImageRepository
  extends ProjectImageRepository {

  async create(data) {
    const [image] =
      await db
        .insert(projectImages)
        .values(data)
        .returning();

    return image;
  }


  async findByProjectId(projectId) {
    return await db
      .select()
      .from(projectImages)
      .where(
        eq(
          projectImages.projectId,
          Number(projectId)
        )
      )
      .orderBy(
        asc(
          projectImages.displayOrder
        )
      );
  }


  async findPrimaryByProjectIds(
    projectIds
  ) {
    if (!projectIds.length) {
      return [];
    }

    return await db
      .select()
      .from(projectImages)
      .where(
        and(
          inArray(
            projectImages.projectId,
            projectIds
          ),
          eq(
            projectImages.isPrimary,
            true
          )
        )
      );
  }


  async findById(id) {
    const [image] =
      await db
        .select()
        .from(projectImages)
        .where(
          eq(
            projectImages.id,
            Number(id)
          )
        );

    return image || null;
  }


  async delete(id) {
    const [image] =
      await db
        .delete(projectImages)
        .where(
          eq(
            projectImages.id,
            Number(id)
          )
        )
        .returning();

    return image;
  }
}


export default PostgresProjectImageRepository;