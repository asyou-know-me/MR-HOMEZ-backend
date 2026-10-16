import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import PostgresPropertyCategoryRepository from "../../infrastructure/repositories/PostgresPropertyCategoryRepository.js";

import S3StorageService from "../../infrastructure/storage/S3StorageService.js";

import CreatePropertyCategory from "../../application/category/CreatePropertyCategory.js";

import GetPropertyCategories from "../../application/category/GetPropertyCategories.js";

import GetPropertyCategoryById from "../../application/category/GetPropertyCategoryById.js";

import UpdatePropertyCategory from "../../application/category/UpdatePropertyCategory.js";

import DeletePropertyCategory from "../../application/category/DeletePropertyCategory.js";

import UploadCategoryImage from "../../application/category/UploadCategoryImage.js";

import PropertyCategoryController from "../controllers/PropertyCategoryController.js";

import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   DEPENDENCIES
========================================================= */

const categoryRepository = new PostgresPropertyCategoryRepository();

const storageService = new S3StorageService();

const createCategory = new CreatePropertyCategory(categoryRepository);

const getCategories = new GetPropertyCategories(
  categoryRepository,
  storageService,
);

const getCategoryById = new GetPropertyCategoryById(
  categoryRepository,
  storageService,
);

const updateCategory = new UpdatePropertyCategory(categoryRepository);

const deleteCategory = new DeletePropertyCategory(
  categoryRepository,
  storageService,
);

const uploadCategoryImage = new UploadCategoryImage(
  categoryRepository,
  storageService,
);

/* =========================================================
   CONTROLLER
========================================================= */

const categoryController = new PropertyCategoryController({
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
});

/* =========================================================
   ROUTES
========================================================= */

router.post("/", authenticate, requireAdmin, categoryController.create);

router.get("/", categoryController.getAll);

router.post(
  "/:id/image",
  authenticate,
  requireAdmin,

  upload.single("image"),
  categoryController.uploadImage,
);

router.get("/:id", categoryController.getById);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  categoryController.update
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  categoryController.delete
);

export default router;
