import express from "express";
import cors from "cors";
import databaseTestRoutes from "./presentation/routes/databaseTestRoutes.js";
import propertyRoutes from "./presentation/routes/propertyRoutes.js";
import projectRoutes from "./presentation/routes/projectRoutes.js";
import propertyCategoryRoutes from "./presentation/routes/propertyCategoryRoutes.js";
import adminRoutes from "./presentation/routes/adminRoutes.js";
import enquiryRoutes from "./presentation/routes/enquiryRoutes.js";
const app = express();
/* MIDDLEWARE */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* API HEALTH CHECK */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api/db-test", databaseTestRoutes);

app.use("/api/properties", propertyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/property-categories", propertyCategoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiries", enquiryRoutes);
export default app;
