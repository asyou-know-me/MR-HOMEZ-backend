import express from "express";

import { db } from "../../infrastructure/database/db.js";
import { properties, propertyImages } from "../../infrastructure/database/schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const propertyData = await db.select().from(properties);
    const imageData = await db.select().from(propertyImages);

    res.status(200).json({
      success: true,
      message: "Database connected successfully",
      data:{
        properties: propertyData,
        propertyImages: imageData
      }
    });
  } catch (err) {
    console.error("Databse connection error:", err);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;