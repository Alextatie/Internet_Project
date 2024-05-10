import express from "express";
const router = express.Router();
import item from "../controllers/item";
import authMiddlewear from "../common/auth_middleware";

router.get("/", authMiddlewear, item.get.bind(item));

router.get("/:id", authMiddlewear, item.getbyID.bind(item));

router.post("/", authMiddlewear, item.post.bind(item));

router.put("/:id", authMiddlewear, item.put.bind(item));

router.delete("/:id", authMiddlewear, item.remove.bind(item));


export default router;
