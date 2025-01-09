import React, { useState } from 'react';
import { saveJournalEntry } from '../utils/indexedDB';
import './styles/JournalEntry.css';

const JournalEntry = ({ date }) => {
  const [entry, setEntry] = useState('');

  const handleSave = async () => {
    await saveJournalEntry(date, entry);
    setEntry('');
  };

  return (
    <div className="journal-entry">
      <h2>Journal Entry</h2>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write about your day..."
      />
      <button onClick={handleSave}>Save Entry</button>
    </div>
  );
};

export default JournalEntry;
