export const getImages = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const saveImages = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeImages = (key) => {
  localStorage.removeItem(key);
};

//since images can't be read from localstorage, must convert them to base64 string
export const imageToString = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); 
    reader.onerror = reject;
    reader.readAsDataURL(file); //read the pic as a base64 string
  });
};