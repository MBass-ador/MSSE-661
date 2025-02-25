/**
 * Creates a list that contains all the registered tests
 * relies on bootstrap being imported in implementing html file
 * 
 * @class TestingList
 */
class TestingList {
    tests = [];
    testingService;
  
    constructor(testingService) {
      this.testingService = testingService;
    }

    // initialize service
    init() {
      this.render();
    }
  

    /**
     * render the DOM for a row of data
     * [delete button, test name, status, date]
     * 
     * @param {Object} test - the test data row to render from db
     * @returns - a row of test data (one test)
     */
    _renderListRowItem = (test) => {
      // create row item
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `test-${test.testId}`;
      listGroupItem.className = 'list-group-item';

      // create delete button column
      const deleteButton = document.createElement('button');
      const deleteButtonTxt = document.createTextNode('Del');
      deleteButton.id = 'delete-btn';
      deleteButton.className = 'btn btn-secondary';
      deleteButton.addEventListener('click', this._deleteEventHandler(test.testId));
      deleteButton.appendChild(deleteButtonTxt);

      // create test name column
      const testNameSpan = document.createElement('span');
      const testName = document.createTextNode(test.test_name);
      testNameSpan.appendChild(testName);

      // create test status column
      const testStatusSpan = document.createElement('span');
      const testStatus = document.createTextNode(test.status);
      testStatusSpan.appendChild(testStatus);

      // create test date column
      const testDateSpan = document.createElement('span');
      const testDate = document.createTextNode(test.created_date);
      testDateSpan.append(testDate);

      // append all columns to row item
      listGroupItem.append(deleteButton);
      listGroupItem.append(testNameSpan);
      listGroupItem.append(testStatusSpan);
      listGroupItem.append(testDateSpan);

      // return row item
      return listGroupItem;
    };


    /**
     * build testing list DOM item
     */
    _renderList = () => {
      // target div container on home.html
      const testingDiv = document.getElementById('tests');
      const loadingDiv = testingDiv.childNodes[0];

      // make list
      const fragment = document.createDocumentFragment();
      const ul = document.createElement('ul');
      ul.id = 'test-list';
      ul.className = 'list-group list-group-flush checked-list-box';

      // map tests to list items
      this.tests.map((test) => {
        const listGroupRowItem = this._renderListRowItem(test);

        ul.appendChild(listGroupRowItem);
      });

      // swap loading div for list
      fragment.appendChild(ul);
      testingDiv.replaceChild(fragment, loadingDiv);
    };


    /**
     * logic to display empty list message DOM item
     */
    _renderMsg = () => {
      const testingDiv = document.getElementById('tests');
      const loadingDiv = testingDiv.childNodes[0];
      const listParent = document.getElementById('test-list');
      const msgDiv = this._createMsgElement('No tests found');

      if (testingDiv) {
        testingDiv.replaceChild(msgDiv, loadingDiv);
      } else {
        testingDiv.replaceChild(msgDiv, listParent);
      }
    };


    /**
     * Function to add a test
     * 
     * @param {Object} newTest - test data to add to db
     */
    addTest = async (newTest) => {
      try {
        const { test_name, status } = newTest;
        await this.testingService.addTest({ test_name, status });
        this.tests.push(newTest);
      } catch (err) {
        console.log(err);
        alert('Error adding test, please try again');
      }
    };


    /**
     * create event handler for adding tests
     * (process DOM)
     */
    _addTestEventHandler = () => {
      // grab the right page element (by id)
      const testInput = document.getElementByName('formInputTestId');
      const test_name = testInput.value;

      const statusSelect = document.getElementById('formSelectStatus');
      const options = statusSelect.options;
      const selectedIndex = statusSelect.selectedIndex;
      const status = options[selectedIndex].text;

      // ask for testName to add
      if (!test_name) {
        alert('Please enter a test name.');
        return;
      }

      const test = { test_name, status };
      const {newTest, newTestEvent } = this._createNewTestEvent(test);

      this.addTest(newTest)
        
      // get list
      const listParent = document.getElementById('test-list');

      // add to or create new list
      if (listParent) {
        listParent.appendChild(newTestEvent);
      } else {
        this._renderList();
      }
      // clear input field
      testInput.value = '';
    }


    /**
     * build DOM element for new test
     * 
     * @param {Object} test - (name and status, id and created date will be generated)
     * @returns           - new test object and DOM event element
     */
    _createNewTestEvent = (test) => {
      const testId = this.tests.length;
      const created_date = new Date().toISOString();
      const newTest = { ...test, testId, created_date };
      const newTestEvent = this._renderListRowItem(newTest);

      return { newTest, newTestEvent };
    };


    /**
     * function to delete a test
     * 
     * @param {number} testId - Id of the test to delete
     * @returns - message whether deleted or not
     */
    deleteTest = async (testId) => {
      try {
        const res = await this.testingService.deleteTest(testId);
        this.tests = this.tests.filter((test) => test.testId !== testId);

        if (res !== null) {
          alert('test deleted successfully');
        }
        return res;
      } catch (err) {
        console.log(err);
        alert('error deleting test, please try again');
      }
    };


    /**
     * Event handler helper for delete from DOM
     * 
     * @param {number} testId - the testId to delete
     * @returns  - status message of delete
     */
    _deleteEventHandler = (testId) => () => {
      const test = document.getElementById(`test-${testId}`);
      test.remove();

      this.deleteTest(testId).then(() => {
        if (!this.tests.length) {
          this._renderMsg();
        }
      });
    };

    /**
     * function to update a test
     * 
     * @param {*} testId    - testId to update
     * @param {*} test_name - test name to update
     * @param {*} status    - test status to update
     * @returns   - mesage whether updated or not
     */
    updateTest = async (testId, test_name, status) => () => {
      try {
        // get test from DOM by id
        const test = document.getElementById(`test-${testId}`);

        // new test object with updated values (no change to created_date)
        const updatedTest = { testId, test_name, status, ...test };
        
        test.parentElement.replaceChild(updatedTest, test);
        alert('test updated successfully');
      } catch (err) {
        console.log(err);
        alert('error updating test, please try again');
      }
  };

  /**
   * create a message div block
   * 
   * @param {String} msg -  message to add to element
   * @returns - div containing message
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const msgText = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(msgText);

    return msgDiv;
  };


  // render list
  render = async () => {
    const tests = await this.testingService.getTests();

    try {
      if (tests.length) {
        this.tests = tests;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`error: ${err.message}`)
    }
  };

}