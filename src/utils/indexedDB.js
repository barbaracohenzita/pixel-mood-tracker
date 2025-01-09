const DB_NAME = 'PixelMoodTracker';
const DB_VERSION = 1;
const MOOD_STORE = 'moods';
const JOURNAL_STORE = 'journals';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(MOOD_STORE)) {
        db.createObjectStore(MOOD_STORE, { keyPath: 'date' });
      }
      if (!db.objectStoreNames.contains(JOURNAL_STORE)) {
        db.createObjectStore(JOURNAL_STORE, { keyPath: 'date' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const saveMoodData = async (date, level, tag) => {
  const db = await openDB();
  const transaction = db.transaction([MOOD_STORE], 'readwrite');
  const store = transaction.objectStore(MOOD_STORE);
  store.put({ date, level, tag });
  return transaction.complete;
};

export const getMoodData = async () => {
  const db = await openDB();
  const transaction = db.transaction([MOOD_STORE], 'readonly');
  const store = transaction.objectStore(MOOD_STORE);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const saveJournalEntry = async (date, text) => {
  const db = await openDB();
  const transaction = db.transaction([JOURNAL_STORE], 'readwrite');
  const store = transaction.objectStore(JOURNAL_STORE);
  store.put({ date, text });
  return transaction.complete;
};

export const getJournalEntries = async () => {
  const db = await openDB();
  const transaction = db.transaction([JOURNAL_STORE], 'readonly');
  const store = transaction.objectStore(JOURNAL_STORE);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const searchMoods = async (query) => {
  const db = await openDB();
  const transaction = db.transaction([MOOD_STORE], 'readonly');
  const store = transaction.objectStore(MOOD_STORE);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      const results = event.target.result.filter((mood) => mood.tag.includes(query));
      resolve(results);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const searchJournalEntries = async (query) => {
  const db = await openDB();
  const transaction = db.transaction([JOURNAL_STORE], 'readonly');
  const store = transaction.objectStore(JOURNAL_STORE);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      const results = event.target.result.filter((entry) => entry.text.includes(query));
      resolve(results);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
