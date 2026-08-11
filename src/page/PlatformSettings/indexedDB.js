/**
 * @file indexedDB.js
 * @description IndexedDB utilities for NEXORA Intelligence Platform.
 * Manages two object stores:
 *   1. activityLogs  — general activity events (kept for future use)
 *   2. cameraSessions — completed camera ON/OFF sessions with duration
 */

const DB_NAME = 'NEXORA_DB';
const DB_VERSION = 4; // bumped to add moduleSessions store

let dbPromise = null;

/** Returns a promise that resolves to the opened IDBDatabase instance. */
function getDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('NEXORA_DB open error:', request.error);
      dbPromise = null; // allow retry
      reject(request.error);
    };

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // ── activityLogs store (DEPRECATED) ───────────────────────────────────
      // We no longer create the activityLogs store, as all clicks are now tracked 
      // within moduleSessions directly. Kept for historical documentation.

      // ── cameraSessions store ──────────────────────────────────────────────
      if (!db.objectStoreNames.contains('cameraSessions')) {
        const s = db.createObjectStore('cameraSessions', {
          keyPath: 'id',
          autoIncrement: true,
        });
        s.createIndex('startTime', 'startTime', { unique: false });
      }

      // ── moduleSessions store ──────────────────────────────────────────────
      if (!db.objectStoreNames.contains('moduleSessions')) {
        const s = db.createObjectStore('moduleSessions', {
          keyPath: 'id',
          autoIncrement: true,
        });
        s.createIndex('startTime', 'startTime', { unique: false });
      }
    };
  });

  return dbPromise;
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  Camera Sessions                                                           */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * Saves a completed camera session.
 * @param {{ startTime: string, stopTime: string, duration: number, status: string }} session
 * @returns {Promise<IDBValidKey>} The auto-generated numeric id.
 */
export async function addCameraSession(session) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('cameraSessions', 'readwrite');
    const store = tx.objectStore('cameraSessions');
    const req = store.add(session);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Returns all camera sessions ordered newest-first.
 * @returns {Promise<Array>}
 */
export async function getCameraSessions() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('cameraSessions', 'readonly');
    const store = tx.objectStore('cameraSessions');
    const index = store.index('startTime');
    const req = index.openCursor(null, 'prev'); // newest first
    const results = [];
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

/**
 * Deletes all camera sessions.
 * @returns {Promise<void>}
 */
export async function clearCameraSessions() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('cameraSessions', 'readwrite');
    tx.objectStore('cameraSessions').clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}



/* ══════════════════════════════════════════════════════════════════════════ */
/*  Module Sessions (Time Tracking)                                          */
/* ══════════════════════════════════════════════════════════════════════════ */

export async function addModuleSession(session) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('moduleSessions', 'readwrite');
    const store = tx.objectStore('moduleSessions');
    const req = store.add(session);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getModuleSessions() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('moduleSessions', 'readonly');
    const store = tx.objectStore('moduleSessions');
    const index = store.index('startTime');
    const req = index.openCursor(null, 'prev'); // newest first
    const results = [];
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function clearModuleSessions() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('moduleSessions', 'readwrite');
    tx.objectStore('moduleSessions').clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
