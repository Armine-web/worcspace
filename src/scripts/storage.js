export class Storage {
    static getItem(key) {
      const data = localStorage.getItem(key);
      try {
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error(`Error parsing ${key} from localStorage: `, error);
        return null;
      }
    }
  
    static setItem(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage: `, error);
      }
    }
  

  }
  

  