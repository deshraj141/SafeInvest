import express from "express";
import { handleAnalyze, handleCompare } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/analyze", handleAnalyze);
router.post("/compare", handleCompare);

export default router;
