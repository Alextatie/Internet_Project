import express from "express";
const router = express.Router();
import student from "../controllers/student";
import authMiddlewear from "../common/auth_middleware";

router.get("/", authMiddlewear, student.get.bind(student));

router.get("/:id", authMiddlewear, student.getbyID.bind(student));

router.post("/", authMiddlewear, student.post.bind(student));

router.put("/:id", authMiddlewear, student.put.bind(student));

router.delete("/:id", authMiddlewear, student.remove.bind(student));

export default router;