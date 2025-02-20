/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     
     not currently used, replaced by functionality 
     in "new" build-testing-list.js file 
*/


// construct list of tests
(async () => {
    const tests = await getTests();
    console.log(tests);
  
    if (tests.length) {
      const div = document.getElementById('tests');
      const loadingDiv = div.childNodes[1];
  
      const ul = document.createElement('ul');
  
      // replace 'loading...' with list
      div.replaceChild(ul, loadingDiv); // <- order is important here!
  
      // create the list
      tests.map((test) => {
        // building blocks
        const li = document.createElement('li');
        li.className = 'test-item';
        const block = document.createElement('div');
        block.className = 'test-item-block';
  
        //   content
        const checkboxSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'test-checkbox';
        checkboxSpan.appendChild(checkbox);
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'test-name';
        nameSpan.innerText = test.name;
  
        const statusSpan = document.createElement('span');
        statusSpan.className = 'test-status';
        statusSpan.innerText = test.status;
  
        const dateSpan = document.createElement('span');
        dateSpan.className = 'test-date';
        dateSpan.innerText = test.created_date;
  
        // add list item
        block.appendChild(checkboxSpan);
        block.appendChild(nameSpan);
        block.appendChild(statusSpan);
        block.appendChild(dateSpan);
  
        li.appendChild(block);
        ul.appendChild(li);
      });
    }
  })();