import express from "express";
import { createNote, getNote, getNotes } from "../controllers/notes";

const router = express.Router();

// Server endpoint
router.get("/", getNotes);

router.get("/:noteId", getNote);

router.post("/", createNote);

export default router;
