/**
 * AJAX add new tasks to task list on save.
 */
const doAddTest = async (e) => {
    e.preventDefault();
  
    const testInput = document.getElementById('formInputTestName');
    const testName = testInput.value;
    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;
  
    if (!testName) {
      alert('Please enter a test name.');
      return;
    }
  
    const res = await addTest({ testName, status });
  
    if (res !== null) {
      inst.generateTests();
    }
    taskInput.value = '';
  };