export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CEPI-Blog', 1);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('posts', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('comments')) {
        db.createObjectStore('comments', { keyPath: 'id' });
      }
    };
  });
};

export const addToStore = (storeName, data) => {
  return initDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.add(data);
      
      request.onsuccess = () => resolve();
      request.onerror = (event) => {
        console.error(`Error adding to ${storeName}:`, event.target.error);
        reject();
      };
    });
  });
};

export const getFromStore = (storeName, id) => {
  return initDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      
      const request = id ? store.get(id) : store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => {
        console.error(`Error getting from ${storeName}:`, event.target.error);
        reject();
      };
    });
  });
};