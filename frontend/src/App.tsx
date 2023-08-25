import React, { useState, useEffect } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import LoadingSkeleton from "./components/LoadingSkeleton";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  // displays the notes
  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        setTimeout(async () => {
          try {
            const notes = await NotesApi.fetchNotes();
            setNotes(notes);
          } finally {
            setNotesLoading(false);
          }
        }, 3000);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
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

  const notesGrid = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
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
  );

  const loadingNotesGrid = (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {Array(7)
        .fill(1)
        .map(() => (
          <LoadingSkeleton />
        ))}
    </div>
  );

  return (
    <Container className="mt-2 flex flex-col align-middle">
      <Button
        className="bg-blue-500 h-10 mb-4 ml-auto mr-auto flex align-middle justify-center gap-4"
        onClick={() => setShowAddNoteModal(true)}
      >
        <FaPlus className="m-auto" />
        Add New Note
      </Button>
      {notesLoading && loadingNotesGrid}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}
        </>
      )}
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
