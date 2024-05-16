import express from "express";
const router = express.Router();
import user from "../controllers/user";
//import authMiddlewear from "../common/auth_middleware";

router.get("/", user.get.bind(user));
//router.get("/", authMiddlewear, student.get.bind(student));

router.get("/:id", user.getbyID.bind(user));

router.put("/:id", user.put.bind(user));

router.delete("/:id", user.remove.bind(user));

export default router;