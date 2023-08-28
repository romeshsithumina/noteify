import express from "express";
import * as UserController from "../controllers/users";
import { requireAuth } from "../middleware/auth";

const router = express.Router();
router.get("/", requireAuth, UserController.getAuthenticatedUser);

router.post("/signUp", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;
