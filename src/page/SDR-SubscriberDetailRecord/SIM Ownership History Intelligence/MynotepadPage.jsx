import { useState, useEffect } from 'react';
import { StickyNote, Trash2, Save, Check, List, Plus, Home } from 'lucide-react';

export default function MynotepadPage({ activePage, setActivePage }) {
  const [viewingAllNotes, setViewingAllNotes] = useState(activePage === 'saved-notes');
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('userNotes');
    if (saved) return JSON.parse(saved);
    const oldNote = localStorage.getItem('userNote');
    if (oldNote) {
       return [{ id: Date.now(), text: oldNote, date: new Date().toLocaleDateString() }];
    }
    return [];
  });
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (activePage === 'saved-notes') {
      setViewingAllNotes(true);
    } else if (activePage === 'note') {
      setViewingAllNotes(false);
    }
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('userNotes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!noteContent.trim()) return;

    if (currentNoteId) {
      setNotes(notes.map(n => n.id === currentNoteId ? { ...n, text: noteContent, date: new Date().toLocaleDateString() } : n));
    } else {
      const newNote = { id: Date.now(), text: noteContent, date: new Date().toLocaleDateString() };
      setNotes([newNote, ...notes]);
      setCurrentNoteId(newNote.id);
    }
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    setNotes(notes.filter(n => n.id !== id));
    if (currentNoteId === id) {
      setCurrentNoteId(null);
      setNoteContent('');
    }
  };

  const openNote = (note) => {
    setCurrentNoteId(note.id);
    setNoteContent(note.text);
    setViewingAllNotes(false);
  };

  const startNewNote = () => {
    setCurrentNoteId(null);
    setNoteContent('');
    setViewingAllNotes(false);
  };

  return (
    <>
      <div className="relative z-10 w-full min-h-screen flex flex-col animate-in fade-in duration-500">
      <div className="w-full relative pt-1 sm:pt-2 pb-2 sm:pb-3 mb-2 sm:mb-3 select-none z-20">
        <button 
          onClick={() => { setActivePage('home'); setViewingAllNotes(false); }}
          className="absolute top-1.5 left-3 sm:top-5 sm:left-6 md:left-10 z-50 text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
        >
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>

        {!viewingAllNotes ? (
          <button 
            onClick={() => setViewingAllNotes(true)}
            className="absolute top-1.5 right-3 sm:top-5 sm:right-6 md:right-10 z-50 text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-amber-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
          >
            <List size={16} className="shrink-0" />
            <span>All Notes</span>
          </button>
        ) : (
          <button 
            onClick={startNewNote}
            className="absolute top-1.5 right-3 sm:top-5 sm:right-6 md:right-10 z-50 text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-amber-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm"
          >
            <Plus size={16} className="shrink-0" />
            <span>New Note</span>
          </button>
        )}

        <div className="flex items-center justify-center w-full relative z-20">
          <div className="flex-1 text-center flex flex-col items-center justify-center min-w-0 pt-1 sm:pt-2 md:pt-3 px-2">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1e2a52] tracking-tight leading-tight break-words pb-1">
              <span>{viewingAllNotes ? 'Saved Notes' : 'My Notepad'}</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Jot down your thoughts, ideas, and keep track of your saved notes.
            </p>
          </div>
        </div>
      </div>
      
      {viewingAllNotes ? (
        <div className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 overflow-y-auto">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500 space-y-4">
              <StickyNote size={48} className="opacity-30" />
              <p>No saved notes yet.</p>
              <button onClick={startNewNote} className="px-6 py-2 bg-amber-500 text-white shadow-lg shadow-amber-500/30 rounded-xl hover:bg-amber-600 transition-all font-medium hover:-translate-y-0.5">Create one</button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 animate-in fade-in duration-300">
              {notes.map(note => (
                <div 
                  key={note.id}
                  onClick={() => openNote(note)}
                  className="group bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.15)] hover:bg-white/80 cursor-pointer transition-all flex flex-col relative overflow-hidden hover:-translate-y-1 break-inside-avoid"
                >
                  <div className="text-xs font-bold text-amber-500 mb-4 uppercase tracking-wider">{note.date}</div>
                  <div className="text-slate-800 whitespace-pre-wrap break-words font-medium leading-relaxed">
                    {note.text || "Empty note"}
                  </div>
                  <button
                    onClick={(e) => deleteNote(note.id, e)}
                    className="absolute top-4 right-4 p-2 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-full transition-all"
                    title="Delete Note"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col animate-in fade-in duration-300">
          <div className="flex-1 p-4 md:p-8 flex flex-col min-h-[50vh]">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Start writing your thoughts here..."
              className="flex-1 w-full p-6 md:p-10 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] resize-none outline-none text-slate-800 text-xl leading-relaxed placeholder-slate-500 font-sans focus:bg-white/60 transition-colors"
              spellCheck="false"
            ></textarea>
          </div>
          
          <div className="p-6 pb-12 flex justify-center">
            <button 
              onClick={handleSaveNote}
              className={`py-4 px-10 rounded-2xl font-bold transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 w-full max-w-md ${isSaved ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/30' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-amber-500/30 hover:-translate-y-1'}`}
            >
              {isSaved ? (
                <>
                  <Check size={22} strokeWidth={3} />
                  <span className="text-lg">Saved!</span>
                </>
              ) : (
                <>
                  <Save size={22} />
                  <span className="text-lg">Save Note</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
