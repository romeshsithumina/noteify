import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  return (
    <Card className="bg-[#FFFBF5] text-[#594545]">
      <Card.Body>
        <Card.Title className="font-bold">{title}</Card.Title>
        <Card.Text className="whitespace-pre-line">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
