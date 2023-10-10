import { useState, useEffect } from "react";

function getStoredValue(key, initialValue) {
  const storedValue = JSON.parse(localStorage.getItem(key));
  //If previously a value is saved return it
  if (storedValue) return storedValue;

  //If no value is saved return the initial value, which could be a function or a variable
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

// export default function useLocalStorage(key, defaultValue) {
//   const [value, setValue] = useState(() => {
//     const storedValue = localStorage.getItem(key);

//     return storedValue === null ? defaultValue : JSON.parse(storedValue);
//   });

//   useEffect(() => {
//     const listener = (e) => {
//       if (e.storageArea === localStorage && e.key === key) {
//         setValue(JSON.parse(e.newValue));
//       }
//     };
//     window.addEventListener('storage', listener);

//     return () => {
//       window.removeEventListener('storage', listener);
//     };
//   }, [key, defaultValue]);

//   const setValueInLocalStorage = (newValue) => {
//     setValue((currentValue) => {
//       const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

//       localStorage.setItem(key, JSON.stringify(result));

//       return result;
//     });
//   };

//   return [value, setValueInLocalStorage];
// }
