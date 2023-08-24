import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  // displays the notes
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
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
      <Button
        className="bg-blue-500 mb-4 block ml-auto mr-auto"
        onClick={() => setShowAddNoteModal(true)}
      >
        Add New Note
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Note
            className="h-[200px] w-min-[150px] transition-shadow duration-200 ease-in-out hover:shadow-md cursor-pointer"
            note={note}
            key={note._id}
          />
        ))}
      </div>
      {showAddNoteModal && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteModal(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
