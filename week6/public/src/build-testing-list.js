/**
 * Creates a list that contains all the registered tests
 * relies on bootstrap being imported in implementing html file
 * 
 * @class TestingList
 */
class TestingList {
    tests = [];
  
    constructor() {}
  
    /**
     * Build testing list parent.
     * Uses bootstrap classes with some custom overrides.
     */
    createTestListParent = () => {
      const ul = document.createElement('ul');
      ul.id = 'testing-list';
      ul.className = 'list-group list-group-flush checked-list-box';
      return ul;
    };
  
    _deleteEventHandler = (testId) => async () => {
      if (testId) {
        const res = await deleteTest(testId);
  
        if (res !== null) {
          this.tests = this.tests.filter((test) => test.testId !== testId);
          const test = document.getElementById(`test-${testId}`);
          test.remove();
  
          if (!this.tests.length) {
            const div = document.getElementById('tests');
            const loadingDiv = div.childNodes[1];
            const errDiv = this.generateErrorMsg('no registered tests to display');
            div.replaceChild(errDiv, loadingDiv);
          }
        }
      }
    };
  
    /**
     * Builds the list item.
     * Uses bootstrap classes with some custom overrides.
     *
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     * @example
     * <li class="list-group-item">
     *   <button class="btn btn-secondary" onclick="deleteTest(e, index)">X</button>
     *   <span>Test name</span>
     *   <span>pending</span>
     *   <span>date create</span>
     * </li>
     */
    buildTestListRowItem = (test) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `test-${test.testId}`; 
      listGroupItem.className = 'list-group-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.className = 'btn btn-secondary';
      deleteBtn.addEventListener('click', this._deleteEventHandler(test.testId));
      deleteBtn.appendChild(deleteBtnTxt);
  
      const testNameSpan = document.createElement('span');
      const testName = document.createTextNode(test.testName);
      testNameSpan.appendChild(testName);
  
      const testStatusSpan = document.createElement('span');
      const testStatus = document.createTextNode(test.status);
      testStatusSpan.append(testStatus);
  
      const testDateSpan = document.createElement('span');
      const testDate = document.createTextNode(test.created_date);
      testDateSpan.append(testDate);
  
      // add list item's details
      listGroupItem.append(deleteBtn);
      listGroupItem.append(testNameSpan);
      listGroupItem.append(testStatusSpan);
      listGroupItem.append(testDateSpan);
  
      return listGroupItem;
    };
  
    /**
     * Assembles the list items then mounts them to a parent node.
     * Uses bootstrap classes with some custom overrides.
     */
    buildTestingList = (mount, tests) =>
      tests.map((test) => {
        const listGroupRowItem = this.buildTestListRowItem(test);
  
        // add entire list item
        mount.append(listGroupRowItem);
      });
  
    generateErrorMsg = (msg) => {
      const div = document.createElement('div');
      const text = document.createTextNode(msg);
      div.id = 'user-message';
      div.className = 'center';
      div.appendChild(text);
      return div;
    };
  
    generateTests = async () => {
      const res = await getTests();
      const div = document.getElementById('tests');
      const loadingDiv = div.childNodes[1];
  
      if (res.length) {
        this.tests = res;
        const testsDiv = this.createTestListParent();
        this.buildTestingList(testsDiv, res);
        div.replaceChild(testsDiv, loadingDiv);
      } else {
        const errDiv = this.generateErrorMsg(res.msg);
        div.replaceChild(errDiv, loadingDiv);
      }
    };
  }
  
  // build list automatically (when this js file loads)
  const testList = new TestingList();
  // IIFE function
  (async () => {
    testList.generateTests();
  })();