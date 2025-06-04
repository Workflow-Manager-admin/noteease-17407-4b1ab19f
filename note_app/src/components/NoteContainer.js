// PUBLIC_INTERFACE
import React, { useState, useEffect } from 'react';
import '../App.css'; // Assuming general styles are in App.css

/**
 * NoteContainer component.
 * Manages the creation, display, editing, deletion, searching, and categorization of notes.
 */
function NoteContainer() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Grocery List', content: 'Milk, Eggs, Bread, Cheese', category: 'Personal' },
    { id: 2, title: 'Meeting Notes', content: 'Discuss project timeline and deliverables.', category: 'Work' },
    { id: 3, title: 'Book Ideas', content: 'Sci-fi novel about AI sentience.', category: 'Creative' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null); // For editing or adding new note
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState('');

  const categories = ['All', 'Personal', 'Work', 'Creative', 'Ideas', 'Reminders'];

  // Effect to handle filtering notes
  const filteredNotes = notes.filter(note => {
    const matchesSearchTerm = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  // PUBLIC_INTERFACE
  /**
   * Handles opening the modal to add a new note.
   */
  const handleAddNewNote = () => {
    setCurrentNote(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory(categories[1] || ''); // Default to the first actual category
    setIsModalOpen(true);
  };

  // PUBLIC_INTERFACE
  /**
   * Handles opening the modal to edit an existing note.
   * @param {object} note - The note object to edit.
   */
  const handleEditNote = (note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteCategory(note.category);
    setIsModalOpen(true);
  };

  // PUBLIC_INTERFACE
  /**
   * Handles deleting a note.
   * @param {number} noteId - The ID of the note to delete.
   */
  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles saving a note (either new or edited).
   */
  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }

    if (currentNote) { // Editing existing note
      setNotes(notes.map(note =>
        note.id === currentNote.id ? { ...note, title: noteTitle, content: noteContent, category: noteCategory || 'Uncategorized' } : note
      ));
    } else { // Adding new note
      const newNote = {
        id: Date.now(), // Simple ID generation
        title: noteTitle,
        content: noteContent,
        category: noteCategory || 'Uncategorized',
      };
      setNotes([...notes, newNote]);
    }
    setIsModalOpen(false);
    // Reset form fields
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory('');
    setCurrentNote(null);
  };

  return (
    <div className="container note-container">
      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search notes by title or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Notes List */}
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <div key={note.id} className="note-item" >
              <div onClick={() => handleEditNote(note)}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
              <div className="note-item-actions">
                <button onClick={() => handleEditNote(note)} className="action-btn edit-btn">Edit</button>
                <button onClick={() => handleDeleteNote(note.id)} className="action-btn delete-btn">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No notes found. Try adjusting your search or filters, or create a new note!</p>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={handleAddNewNote}>
        +
      </button>

      {/* Add/Edit Note Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{currentNote ? 'Edit Note' : 'Add New Note'}</h2>
            <label htmlFor="noteTitle">Title</label>
            <input
              type="text"
              id="noteTitle"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note title"
            />

            <label htmlFor="noteContent">Content</label>
            <textarea
              id="noteContent"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Note content"
            />

            <label htmlFor="noteCategory">Category</label>
            <select
                id="noteCategory"
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
            >
                {categories.filter(cat => cat !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                 <option value="">Uncategorized</option> {/* Option for no category */}
            </select>


            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)} className="modal-btn cancel-btn">Cancel</button>
              <button onClick={handleSaveNote} className="modal-btn save-btn">Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteContainer;
