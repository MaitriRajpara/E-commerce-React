export const storage = {
  get: (key: string) => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return item;
    }
  },
  set: (key: string, value: any) => {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, data);
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
