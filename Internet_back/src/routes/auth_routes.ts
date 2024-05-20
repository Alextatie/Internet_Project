import express from "express";
const router = express.Router();
import auth from "../controllers/auth";
import authMiddlewear from "../common/auth_middleware";

router.post("/register", auth.register);

router.post("/login",  auth.login);

router.get("/logout", authMiddlewear, auth.logout);

router.get("/refresh", authMiddlewear, auth.refresh);

export default router;