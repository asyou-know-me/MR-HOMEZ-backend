import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import PostgresProjectRepository from "../../infrastructure/repositories/PostgresProjectRepository.js";

import PostgresProjectImageRepository from "../../infrastructure/repositories/PostgresProjectImageRepository.js";

import S3StorageService from "../../infrastructure/storage/S3StorageService.js";

import CreateProject from "../../application/project/CreateProject.js";
import GetProjects from "../../application/project/GetProjects.js";
import GetProjectById from "../../application/project/GetProjectById.js";
import UpdateProject from "../../application/project/UpdateProject.js";
import DeleteProject from "../../application/project/DeleteProject.js";

import UploadProjectImages from "../../application/project/UploadProjectImages.js";
import GetProjectImages from "../../application/project/GetProjectImages.js";
import DeleteProjectImage from "../../application/project/DeleteProjectImage.js";

import ProjectController from "../controllers/ProjectController.js";
import {
  authenticate,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();


/* REPOSITORIES */

const projectRepository =
  new PostgresProjectRepository();

const projectImageRepository =
  new PostgresProjectImageRepository();

const storageService =
  new S3StorageService();


/* USE CASES */

const createProject =
  new CreateProject(
    projectRepository
  );

const getProjects =
  new GetProjects(
    projectRepository,
    projectImageRepository,
    storageService
  );

const getProjectById =
  new GetProjectById(
    projectRepository,
    projectImageRepository,
    storageService
  );

const updateProject =
  new UpdateProject(
    projectRepository
  );

const deleteProject =
  new DeleteProject(
    projectRepository,
    projectImageRepository,
    storageService
  );

const uploadProjectImages =
  new UploadProjectImages(
    projectRepository,
    projectImageRepository,
    storageService
  );

const getProjectImages =
  new GetProjectImages(
    projectImageRepository,
    storageService
  );

const deleteProjectImage =
  new DeleteProjectImage(
    projectImageRepository,
    storageService
  );


/* CONTROLLER */

const projectController =
  new ProjectController({
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    uploadProjectImages,
    getProjectImages,
    deleteProjectImage,
  });


/* ROUTES */

router.post(
  "/",
  authenticate,
  requireAdmin,
  projectController.create
);

router.get(
  "/",
  projectController.getAll
);


router.post(
  "/:id/images",
  authenticate,
  requireAdmin,

  upload.array(
    "images",
    10
  ),
  projectController.uploadImages
);


router.get(
  "/:id/images",
  projectController.getImages
);


router.delete(
  "/:id/images/:imageId",
  authenticate,
  requireAdmin,
  projectController.deleteImage
);


router.get(
  "/:id",
  projectController.getById
);


router.put(
  "/:id",
  authenticate,
  requireAdmin,
  projectController.update
);


router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  projectController.delete
);


export default router;