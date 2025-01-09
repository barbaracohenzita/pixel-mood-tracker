import React, { useState, useEffect } from 'react';
import { getMoodData, getJournalEntries } from '../utils/indexedDB';
import './styles/CalendarView.css';

const CalendarView = () => {
  const [moodData, setMoodData] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const moods = await getMoodData();
      const journals = await getJournalEntries();
      setMoodData(moods);
      setJournalEntries(journals);
    };
    fetchData();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderHeatmap = () => {
    const daysInMonth = new Date().getDate();
    const heatmap = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), i).toISOString().split('T')[0];
      const mood = moodData.find((mood) => mood.date === date);
      const moodLevel = mood ? `mood-${mood.level}` : '';
      heatmap.push(
        <div
          key={i}
          className={`day ${moodLevel}`}
          onClick={() => handleDateClick(date)}
        ></div>
      );
    }
    return heatmap;
  };

  const renderJournalEntry = () => {
    if (!selectedDate) return null;
    const entry = journalEntries.find((entry) => entry.date === selectedDate);
    return entry ? <div>{entry.text}</div> : <div>No journal entry for this date</div>;
  };

  return (
    <div className="calendar-view">
      <div className="heatmap">
        {renderHeatmap()}
      </div>
      <div className="journal-entry">
        {renderJournalEntry()}
      </div>
    </div>
  );
};

export default CalendarView;
