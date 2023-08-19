import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes";

const router = express.Router();

// Server endpoint
router.get("/", getNotes);

router.get("/:noteId", getNote);

router.post("/", createNote);

router.patch("/:noteId", updateNote);

router.delete("/:noteId", deleteNote);

export default router;
