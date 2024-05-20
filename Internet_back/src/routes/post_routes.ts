import express from "express";
const router = express.Router();
import post from "../controllers/post";
import authMiddlewear from "../common/auth_middleware";

router.get("/", authMiddlewear, post.get.bind(post));

router.get("/:id", authMiddlewear, post.getbyID.bind(post));

router.post("/", authMiddlewear, post.post.bind(post));

router.put("/:id", authMiddlewear,  post.put.bind(post));

router.delete("/:id", authMiddlewear,  post.remove.bind(post));


export default router;