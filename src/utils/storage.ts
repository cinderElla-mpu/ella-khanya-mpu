import { PortfolioData, StoredFile } from '../types.ts';
import { initialPortfolioData } from '../data/initialData.ts';

const DB_NAME = 'ella_portfolio_db';
const DB_VERSION = 1;
const STORE_DATA = 'portfolio_data';
const STORE_FILES = 'portfolio_files';
const LOCAL_STORAGE_KEY = 'ella_portfolio_state_v1';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_DATA)) {
        db.createObjectStore(STORE_DATA);
      }
      if (!db.objectStoreNames.contains(STORE_FILES)) {
        db.createObjectStore(STORE_FILES);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadPortfolioData(): Promise<PortfolioData> {
  let loadedData: PortfolioData = { ...initialPortfolioData };

  // Try to load from localStorage first for instant initial render
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      loadedData = { ...initialPortfolioData, ...parsed };
      if (Array.isArray(loadedData.projects)) {
        const existingIds = new Set(loadedData.projects.map((p) => p.id));
        for (const defProj of initialPortfolioData.projects) {
          if (!existingIds.has(defProj.id)) {
            loadedData.projects.push(defProj);
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not read from localStorage:', err);
  }

  // Try to fetch persisted files & latest state from IndexedDB
  try {
    const db = await openDatabase();
    const tx = db.transaction([STORE_DATA, STORE_FILES], 'readonly');
    const dataStore = tx.objectStore(STORE_DATA);
    const filesStore = tx.objectStore(STORE_FILES);

    const dataReq = dataStore.get('current');
    const profileReq = filesStore.get('profilePicture');
    const cvReq = filesStore.get('cvFile');

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });

    if (dataReq.result) {
      loadedData = { ...loadedData, ...dataReq.result };
      if (Array.isArray(loadedData.projects)) {
        const existingIds = new Set(loadedData.projects.map((p) => p.id));
        for (const defProj of initialPortfolioData.projects) {
          if (!existingIds.has(defProj.id)) {
            loadedData.projects.push(defProj);
          }
        }
      }
    }
    if (profileReq.result) {
      loadedData.profilePicture = profileReq.result;
    }
    if (cvReq.result) {
      loadedData.cvFile = cvReq.result;
    }
  } catch (err) {
    console.warn('IndexedDB read fallback:', err);
  }

  return loadedData;
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  // Sync to localStorage (excluding heavy binary dataUrl if large)
  try {
    const lightweightData = {
      ...data,
      // Avoid localStorage quota crash if files are big
      profilePicture: data.profilePicture ? { ...data.profilePicture, dataUrl: data.profilePicture.dataUrl.slice(0, 500) } : null,
      cvFile: data.cvFile ? { ...data.cvFile, dataUrl: '' } : null,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lightweightData));
  } catch (err) {
    console.warn('Failed saving to localStorage:', err);
  }

  // Persist complete data with high capacity into IndexedDB
  try {
    const db = await openDatabase();
    const tx = db.transaction([STORE_DATA, STORE_FILES], 'readwrite');
    const dataStore = tx.objectStore(STORE_DATA);
    const filesStore = tx.objectStore(STORE_FILES);

    dataStore.put(data, 'current');

    if (data.profilePicture) {
      filesStore.put(data.profilePicture, 'profilePicture');
    } else {
      filesStore.delete('profilePicture');
    }

    if (data.cvFile) {
      filesStore.put(data.cvFile, 'cvFile');
    } else {
      filesStore.delete('cvFile');
    }

    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB write fallback:', err);
  }
}

export function fileToStoredFile(file: File): Promise<StoredFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl: reader.result as string,
        uploadedAt: new Date().toISOString(),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function downloadFile(file: StoredFile): void {
  if (!file || !file.dataUrl) return;

  const link = document.createElement('a');
  link.href = file.dataUrl;
  link.download = file.name || 'document';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportPortfolioJSON(data: PortfolioData): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ella-khanya-mpu-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importPortfolioJSON(file: File): Promise<PortfolioData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON file format.'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
