import React, { useState, useEffect } from 'react';
import { getMoodData } from '../utils/indexedDB';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './styles/MoodAnalytics.css';

const MoodAnalytics = () => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const moods = await getMoodData();
      setMoodData(moods);
    };
    fetchData();
  }, []);

  const calculateAverageMood = () => {
    if (moodData.length === 0) return 0;
    const totalMood = moodData.reduce((acc, mood) => acc + mood.level, 0);
    return totalMood / moodData.length;
  };

  const findMostCommonMood = () => {
    if (moodData.length === 0) return null;
    const moodFrequency = moodData.reduce((acc, mood) => {
      acc[mood.tag] = (acc[mood.tag] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(moodFrequency).reduce((a, b) => (moodFrequency[a] > moodFrequency[b] ? a : b));
  };

  const moodTrendsData = {
    labels: moodData.map((mood) => mood.date),
    datasets: [
      {
        label: 'Mood Level',
        data: moodData.map((mood) => mood.level),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const moodDistributionData = {
    labels: [...new Set(moodData.map((mood) => mood.tag))],
    datasets: [
      {
        label: 'Mood Distribution',
        data: [...new Set(moodData.map((mood) => mood.tag))].map(
          (tag) => moodData.filter((mood) => mood.tag === tag).length
        ),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="mood-analytics">
      <h2>Mood Analytics</h2>
      <div className="average-mood">
        <h3>Average Mood</h3>
        <p>{calculateAverageMood()}</p>
      </div>
      <div className="most-common-mood">
        <h3>Most Common Mood</h3>
        <p>{findMostCommonMood()}</p>
      </div>
      <div className="mood-trends">
        <h3>Mood Trends</h3>
        <Line data={moodTrendsData} />
      </div>
      <div className="mood-distribution">
        <h3>Mood Distribution</h3>
        <Pie data={moodDistributionData} />
      </div>
    </div>
  );
};

export default MoodAnalytics;
