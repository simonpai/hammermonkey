import { useState, useCallback } from 'react';

function read(key) {
  const str = window.localStorage.getItem(key);
  return str && JSON.parse(str);
}

function resolve(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export default function usePersistentState(key, {initialValue} = {}) {
  const [value, setValue] = useState(() => read(key) || resolve(initialValue));
  const setAndSaveValue = useCallback(v => {
    window.localStorage.setItem(key, JSON.stringify(v));
    setValue(v);
  }, [value]);
  const clearValue = useCallback(() => window.localStorage.removeItem(key));
  return [value, setAndSaveValue, clearValue];
}
