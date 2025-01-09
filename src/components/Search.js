import React, { useState } from 'react';
import { searchMoods, searchJournalEntries } from '../utils/indexedDB';
import './styles/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const moodResults = await searchMoods(query);
    const journalResults = await searchJournalEntries(query);
    setResults([...moodResults, ...journalResults]);
  };

  return (
    <div className="search">
      <h2>Search Moods and Journal Entries</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="search-result">
              <p>{result.date}: {result.text || result.tag}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
