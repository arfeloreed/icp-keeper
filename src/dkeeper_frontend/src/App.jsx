import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { dkeeper_backend } from "../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  function deleteNote(id) {
    dkeeper_backend.deleteNote(id);

    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  async function fetchData() {
    const notesArray = await dkeeper_backend.getNotes();
    setNotes(notesArray);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
