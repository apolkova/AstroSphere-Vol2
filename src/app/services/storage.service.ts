import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async save(key: string, value: any): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  }

  async load(key: string): Promise<any | null> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
    });
  }

  async remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  }
}
