import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`bg-[#FFFBF5] text-[#594545] ${className}`}>
      <Card.Body
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(180deg, #000 70%, transparent)",
        }}
      >
        <Card.Title className="font-bold">{title}</Card.Title>
        <Card.Text className="whitespace-pre-line">{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="h-10 text-gray-400">
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  );
};

export default Note;
