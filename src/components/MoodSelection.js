import React, { useState } from 'react';
import './styles/MoodSelection.css';

const MoodSelection = ({ onMoodSelect }) => {
  const [customMoods, setCustomMoods] = useState([]);
  const [newMood, setNewMood] = useState('');

  const handleAddMood = () => {
    if (newMood.trim() !== '') {
      setCustomMoods([...customMoods, newMood]);
      setNewMood('');
    }
  };

  const handleMoodClick = (mood) => {
    onMoodSelect(mood);
  };

  return (
    <div className="mood-selection">
      <h2>Select Your Mood</h2>
      <div className="mood-list">
        {customMoods.map((mood, index) => (
          <div key={index} className="mood-item" onClick={() => handleMoodClick(mood)}>
            {mood}
          </div>
        ))}
      </div>
      <div className="add-mood">
        <input
          type="text"
          value={newMood}
          onChange={(e) => setNewMood(e.target.value)}
          placeholder="Add custom mood"
        />
        <button onClick={handleAddMood}>Add Mood</button>
      </div>
    </div>
  );
};

export default MoodSelection;
