import { InferSchemaType, Schema, model } from "mongoose";

// creates a schema for the notes
const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

// typescript type creation
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
