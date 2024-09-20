export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const Keys = {
  AUTH_TOKEN: "AUTH_TOKEN",
};
