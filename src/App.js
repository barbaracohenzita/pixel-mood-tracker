import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import MoodSelection from './components/MoodSelection';
import JournalEntry from './components/JournalEntry';
import MoodAnalytics from './components/MoodAnalytics';
import Search from './components/Search';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mood-selection">Mood Selection</Link>
            </li>
            <li>
              <Link to="/journal-entry">Journal Entry</Link>
            </li>
            <li>
              <Link to="/mood-analytics">Mood Analytics</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={CalendarView} />
          <Route path="/mood-selection" component={MoodSelection} />
          <Route path="/journal-entry" component={JournalEntry} />
          <Route path="/mood-analytics" component={MoodAnalytics} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
