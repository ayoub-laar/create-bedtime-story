export function useLocalStorage() {
  function getValue(key: string) {
    if (!localStorage) return null;
    const value = localStorage.getItem(key);


    if (value) {
      try {
        JSON.parse(value)
        return JSON.parse(value)
      } catch (e) {
        return value
      } 
    }
    
    return null
  }

  function setValue(key: string, value: string) {
    if (!localStorage) return null;
    localStorage.setItem(key, value);
  }

  function removeValue(key: string) {
    if (!localStorage) return null;
    localStorage.removeItem(key);
  }

  return {
    getValueFromLocalStorage: getValue,
    saveValueToLocalStorage: setValue,
    removeValueFromLocalStorage: removeValue,
  }
}