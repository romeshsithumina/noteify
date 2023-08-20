import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  // displays the notes
  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Note
            className="h-[200px] w-min-[150px] transition-shadow duration-200 ease-in-out hover:shadow-md cursor-pointer"
            note={note}
            key={note._id}
          />
        ))}
      </div>
    </Container>
  );
}

export default App;
