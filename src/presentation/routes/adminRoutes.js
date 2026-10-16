import express
  from "express";

import PostgresAdminRepository
  from "../../infrastructure/repositories/PostgresAdminRepository.js";

import LoginAdmin
  from "../../application/admin/LoginAdmin.js";

import AdminController
  from "../controllers/AdminController.js";


const router =
  express.Router();


const adminRepository =
  new PostgresAdminRepository();


const loginAdmin =
  new LoginAdmin(
    adminRepository
  );


const adminController =
  new AdminController({
    loginAdmin,
  });


router.post(
  "/login",
  adminController.login
);


export default router;