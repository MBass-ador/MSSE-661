// local browser data functions

/**
 * saves encoded data to browser storage (by key)
 * 
 * @param {key} key   - to set to "encodedData"
 * @param {*} data  - raw data to encode as "encodedData" 
 */
const setStorage = (key, data) => {
    const dataAsString = JSON.stringify(data);
    const encodedData = btoa(dataAsString);
    localStorage.setItem(key, encodedData);
  };

  /**
   * retrieve data from browser storage (by key)
   * 
   * @param {string} key - to retrieve data from local storage
   * @returns 
   */
  const getStorage = (key) => {
    const encodedData = localStorage.getItem(key);
    // when no encoded data return nothing
    if (!encodedData) {
      return null;
    }
    // when there is encoded data, decode it 
    const decodedData = atob(encodedData);
    // and return it
    return JSON.parse(decodedData); // {}
  };
  

  /**
   * delete browser stored item by key
   * 
   * @param {string} key - to identify what local storage to delete
   */
  const clearStorage = (key) => {
    localStorage.removeItem(key);
  };
  

  /**
   * check if any data stored in browser
   * 
   * @returns   - boolean if there is anything saved in browser
   */
  const storageHasData = () => localStorage.length > 0;