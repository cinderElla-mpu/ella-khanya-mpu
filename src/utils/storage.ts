import { PortfolioData, StoredFile } from '../types.ts';
import { initialPortfolioData } from '../data/initialData.ts';

const DB_NAME = 'ella_portfolio_db';
const DB_VERSION = 1;
const STORE_DATA = 'portfolio_data';
const STORE_FILES = 'portfolio_files';
const LOCAL_STORAGE_KEY = 'ella_portfolio_state_v2';

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

  // Ensure certifications are populated from initialPortfolioData
  if (!loadedData.certifications || loadedData.certifications.length === 0) {
    loadedData.certifications = initialPortfolioData.certifications;
  } else {
    const defMap = new Map(initialPortfolioData.certifications.map((c) => [c.id, c]));
    loadedData.certifications = loadedData.certifications.map((c) => {
      const def = defMap.get(c.id);
      if (def) {
        return {
          ...c,
          certificateLink: def.certificateLink,
          shareUrl: def.shareUrl || def.certificateLink,
          credentialId: def.credentialId || c.credentialId,
          instructor: def.instructor || c.instructor,
        };
      }
      return c;
    });
    const existingCertIds = new Set(loadedData.certifications.map((c) => c.id));
    for (const defCert of initialPortfolioData.certifications) {
      if (!existingCertIds.has(defCert.id)) {
        loadedData.certifications.push(defCert);
      }
    }
  }

  // Ensure education items are populated from initialPortfolioData
  if (!loadedData.education || loadedData.education.length === 0) {
    loadedData.education = initialPortfolioData.education;
  } else {
    const existingEduIds = new Set(loadedData.education.map((e) => e.id));
    for (const defEdu of initialPortfolioData.education) {
      if (!existingEduIds.has(defEdu.id)) {
        loadedData.education.push(defEdu);
      }
    }
  }

  // Ensure CV file metadata is populated if missing
  if (!loadedData.cvFile) {
    loadedData.cvFile = initialPortfolioData.cvFile;
  }

  // Ensure phone and languages are populated
  if (initialPortfolioData.personalInfo.phone && !loadedData.personalInfo.phone) {
    loadedData.personalInfo.phone = initialPortfolioData.personalInfo.phone;
  }
  if (!loadedData.personalInfo.languages || loadedData.personalInfo.languages.length === 0) {
    loadedData.personalInfo.languages = initialPortfolioData.personalInfo.languages;
  }

  // Ensure valid profile picture fallback if missing or corrupted from legacy slice
  if (
    !loadedData.profilePicture ||
    !loadedData.profilePicture.dataUrl ||
    (loadedData.profilePicture.dataUrl.startsWith('data:') && loadedData.profilePicture.dataUrl.length < 1000)
  ) {
    loadedData.profilePicture = initialPortfolioData.profilePicture;
  }

  return loadedData;
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  // Sync to localStorage
  try {
    const lightweightData = {
      ...data,
      // Retain profile picture safely
      profilePicture: data.profilePicture,
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
