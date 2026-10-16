import express from "express";

import PostgresPropertyRepository from "../../infrastructure/repositories/PostgresPropertyRepository.js";
import PostgresPropertyImageRepository from "../../infrastructure/repositories/PostgresPropertyImageRepository.js";

import S3StorageService from "../../infrastructure/storage/S3StorageService.js";

import CreateProperty from "../../application/property/CreateProperty.js";
import GetProperties from "../../application/property/GetProperties.js";
import GetPropertyById from "../../application/property/GetPropertyById.js";
import UpdateProperty from "../../application/property/UpdateProperty.js";
import DeleteProperty from "../../application/property/DeleteProperty.js";

import UploadPropertyImages from "../../application/property/UploadPropertyImages.js";
import GetPropertyImages from "../../application/property/GetPropertyImages.js";
import DeletePropertyImage from "../../application/property/DeletePropertyImage.js";

import upload from "../middleware/uploadMiddleware.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import PropertyController from "../controllers/propertyController.js";

const router = express.Router();

/* =========================================================
   DEPENDENCY INJECTION
========================================================= */

/* REPOSITORIES */

const propertyRepository = new PostgresPropertyRepository();

const propertyImageRepository = new PostgresPropertyImageRepository();

/* STORAGE */

const storageService = new S3StorageService();

/* =========================================================
   PROPERTY USE CASES
========================================================= */

const createProperty = new CreateProperty(propertyRepository);

const getProperties = new GetProperties(
  propertyRepository,
  propertyImageRepository,
  storageService,
);

const getPropertyById = new GetPropertyById(
  propertyRepository,
  propertyImageRepository,
  storageService,
);

const updateProperty = new UpdateProperty(propertyRepository);

const deleteProperty = new DeleteProperty(propertyRepository);

/* =========================================================
   PROPERTY IMAGE USE CASES
========================================================= */

const uploadPropertyImages = new UploadPropertyImages(
  propertyRepository,
  propertyImageRepository,
  storageService,
);

const getPropertyImages = new GetPropertyImages(
  propertyImageRepository,
  storageService,
);

const deletePropertyImage = new DeletePropertyImage(
  propertyImageRepository,
  storageService,
);

/* =========================================================
   CONTROLLER
========================================================= */

const propertyController = new PropertyController({
  createProperty,

  getProperties,

  getPropertyById,

  updateProperty,

  deleteProperty,

  uploadPropertyImages,

  getPropertyImages,

  deletePropertyImage,
});

/* =========================================================
   PROPERTY ROUTES
========================================================= */

router.post("/", authenticate, requireAdmin, propertyController.create);

router.get("/", propertyController.getAll);

/* =========================================================
   PROPERTY IMAGE ROUTES
========================================================= */

router.post(
  "/:id/images",
  authenticate,
  requireAdmin,

  upload.array("images", 10),

  propertyController.uploadImages,
);

router.get("/:id/images", propertyController.getImages);

router.delete(
  "/:id/images/:imageId",
  authenticate,
  requireAdmin,
  propertyController.deleteImage,
);

/* =========================================================
   SINGLE PROPERTY ROUTES
========================================================= */

router.get("/:id", propertyController.getById);

router.put("/:id", authenticate, requireAdmin, propertyController.update);

router.delete("/:id", authenticate, requireAdmin, propertyController.delete);

export default router;
