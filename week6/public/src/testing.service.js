// define "testing" API endpoint
const TESTING_API = `${BASE_API_URL}/testing`; // http://localhost:3000/api/testing


/**
 *  service route to get all tests
 * 
 * @returns     - response json object from _get helper function 
 */
const getTests = () => _get(TESTING_API, OPTIONS_WITH_AUTH);


/**
 *  service to add a test
 * 
 * @param {*} formData  - data to add as new test
 * @returns             - response json object from _post helper function
 */
const addTest = (formData) =>
    _post(TESTING_API, formData, DEFAULT_OPTIONS_WITH_AUTH);


/**
 *  service to delete a test
 * 
 * @param {string} testId    - id of test to delete
 * @returns             - response json object from _delete helper function
 */
const deleteTest = (testId) =>
    _delete(`${TESTING_API}/${testId}`, OPTIONS_WITH_AUTH);