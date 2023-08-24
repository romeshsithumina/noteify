import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

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

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      // removes the note from the UI
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container className="mt-2">
      <Button
        className="bg-blue-500 h-10 mb-4 ml-auto mr-auto flex align-middle justify-center gap-4"
        onClick={() => setShowAddNoteModal(true)}
      >
        <FaPlus className="m-auto" />
        Add New Note
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Note
            className="h-[200px] w-min-[150px] transition-shadow duration-200 ease-in-out hover:shadow-md cursor-pointer"
            note={note}
            key={note._id}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClicked={deleteNote}
          />
        ))}
      </div>
      {showAddNoteModal && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSaved={(newNote) => {
            // display the new note in UI without refreshing
            setNotes([...notes, newNote]);
            setShowAddNoteModal(false);
          }}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
