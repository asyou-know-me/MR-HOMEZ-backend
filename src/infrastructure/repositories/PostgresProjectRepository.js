import {
  eq,
  and,
  or,
  ilike,
} from "drizzle-orm";

import ProjectRepository from "../../domain/project/ProjectRepository.js";

import { db } from "../database/db.js";

import {
  projects,
} from "../database/schema.js";


class PostgresProjectRepository
  extends ProjectRepository {

  async create(data) {
    const [project] =
      await db
        .insert(projects)
        .values(data)
        .returning();

    return project;
  }


  async findAll(filters = {}) {
    const {
      search,
      city,
      projectType,
      launchStatus,
      featured,
      status,
    } = filters;

    const conditions = [];


    if (search?.trim()) {
      const value =
        `%${search.trim()}%`;

      conditions.push(
        or(
          ilike(
            projects.name,
            value
          ),
          ilike(
            projects.developerName,
            value
          ),
          ilike(
            projects.city,
            value
          ),
          ilike(
            projects.locality,
            value
          )
        )
      );
    }


    if (city?.trim()) {
      conditions.push(
        ilike(
          projects.city,
          city.trim()
        )
      );
    }


    if (projectType?.trim()) {
      conditions.push(
        ilike(
          projects.projectType,
          projectType.trim()
        )
      );
    }


    if (launchStatus?.trim()) {
      conditions.push(
        ilike(
          projects.launchStatus,
          launchStatus.trim()
        )
      );
    }


    if (
      featured === "true" ||
      featured === "false"
    ) {
      conditions.push(
        eq(
          projects.featured,
          featured === "true"
        )
      );
    }


    if (status?.trim()) {
      conditions.push(
        ilike(
          projects.status,
          status.trim()
        )
      );
    }


    if (conditions.length === 0) {
      return await db
        .select()
        .from(projects);
    }


    return await db
      .select()
      .from(projects)
      .where(
        and(...conditions)
      );
  }


  async findById(id) {
    const [project] =
      await db
        .select()
        .from(projects)
        .where(
          eq(
            projects.id,
            Number(id)
          )
        );

    return project || null;
  }


  async update(id, data) {
    const [project] =
      await db
        .update(projects)
        .set({
          ...data,
          updatedAt:
            new Date(),
        })
        .where(
          eq(
            projects.id,
            Number(id)
          )
        )
        .returning();

    return project;
  }


  async delete(id) {
    const [project] =
      await db
        .delete(projects)
        .where(
          eq(
            projects.id,
            Number(id)
          )
        )
        .returning();

    return project;
  }
}


export default PostgresProjectRepository;