import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
  className,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      className={`bg-[#FFFBF5] text-[#594545] ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(180deg, #000 70%, transparent)",
        }}
      >
        <Card.Title className="font-bold flex align-middle justify-center gap-4">
          {title}
          <MdDelete
            className="text-[#5945458a] ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className="whitespace-pre-line">{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="h-10 text-gray-400">
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  );
};

export default Note;
