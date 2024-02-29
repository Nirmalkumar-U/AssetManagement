import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db: IDBDatabase | undefined;

  constructor() { }

  public initDb(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('Branch', 2);

      request.onerror = (event) => {
        reject(`IndexedDB error: ${event}`);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as any).result;
        const objectStore = db.createObjectStore('Branch', { keyPath: 'BranchId', autoIncrement: true });
        
        objectStore.createIndex('BranchName', 'BranchName', { unique: false });
        objectStore.createIndex('BranchCode', 'BranchCode', { unique: false });
        objectStore.createIndex('City', 'City', { unique: false });
        objectStore.createIndex('State', 'State', { unique: false });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as any).result;
        resolve();
      };
    });
  }

  public getAllData(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const transaction = this.db!.transaction(['Branch'], 'readonly');
      const objectStore = transaction.objectStore('Branch');
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(`Error getting data: ${event}`);
      };
    });
  }

  public addData(data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['Branch'], 'readwrite');
      const objectStore = transaction.objectStore('Branch');
      const request = objectStore.add(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(`Error adding data: ${event}`);
      };
    });
  }

  public updateData(data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['Branch'], 'readwrite');
      const objectStore = transaction.objectStore('Branch');
      const request = objectStore.put(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(`Error updating data: ${event}`);
      };
    });
  }

  public deleteData(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['Branch'], 'readwrite');
      const objectStore = transaction.objectStore('Branch');
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(`Error deleting data: ${event}`);
      };
    });
  }
  public clearAllData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['Branch'], 'readwrite');
      const objectStore = transaction.objectStore('Branch');
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(`Error clearing data: ${event}`);
      };
    });
  }

  deleteDatabase(databaseName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(databaseName);

      deleteRequest.onsuccess = () => {
        console.log('Database deleted successfully');
        resolve();
      };

      deleteRequest.onerror = (event) => {
        console.error('Error deleting database:');
        reject(`Error deleting database: `);
      };
    });
  }
}
