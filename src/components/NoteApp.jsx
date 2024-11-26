import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const NoteApp = () => {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "catatan"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addNote = async () => {
    if (content.trim()) {
      await addDoc(collection(db, "catatan"), {
        content,
        date: new Date(),
      });
      setContent("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes</h1>
      <div className="mb-6 w-full max-w-lg">
        <textarea
          className="w-full p-4 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={addNote}
        >
          Add Note
        </button>
      </div>
      <div className="w-full max-w-lg space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 border rounded-lg shadow relative bg-gray-50 bg-paper"
          >
            <p className="text-gray-700 font-medium mb-2">{note.content}</p>
            <span className="text-xs text-gray-500 absolute bottom-2 right-2">
              {new Date(note.date.toDate()).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
