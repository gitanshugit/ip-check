import { IPData } from '../types';

const STORAGE_KEY = 'ip-history';

export const getIPHistory = (): IPData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveIPHistory = (history: IPData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addToHistory = (newIP: IPData): IPData[] => {
  const history = getIPHistory();
  const updatedHistory = [newIP, ...history].slice(0, 10); // Keep only last 10 entries
  saveIPHistory(updatedHistory);
  return updatedHistory;
};