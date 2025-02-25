const testingService = new TestingService();
const tests = new TestingList(testingService);

describe('Testing App', () => {
  it('should initialize some HTML', () => {
    spyOn(tests, 'init');
    tests.init();

    expect(tests.init).toHaveBeenCalled();
  });

  it('should add a test', async () => {
    const newTest = {
      testId: 0,
      test_name: 'Third test',
      status: 'pending',
      created_date: '2020-04-14 22:50:32'
    };
    const addTestServiceSpy = spyOn(testingService, 'addTest');

    expect(tests.tests.length).toBe(0);

    await tests.addTest(newTest);

    expect(addTestServiceSpy).toHaveBeenCalled();
    expect(tests.tests.length).toBe(1);
  });

  it('should delete a test', async () => {
    const existingTest = {
      testId: 0,
      test_name: 'Third task',
      status: 'pending',
      created_date: '2020-04-14 22:50:32',
    };
    const deleteTestServiceSpy = spyOn(testingService, 'deleteTest');

    expect(tests.tests.length).toBe(1);

    await tests.deleteTest(existingTest.testId);

    expect(deleteTestServiceSpy).toHaveBeenCalled();
    expect(tests.tests.length).toBe(0);
  });

  xit('should update an individual test', async () => {
    // start with a new test
    const newTest = {
        testId: 0,
        test_name: 'fourth test',
        status: 'pending',
        created_date: '2020-04-14 22:50:32',
    };
    // add it
    await tests.addTest(newTest);

    const testUpdateServiceSpy = spyOn(testingService, "updateTest");

    expect(tests.tests.length).toBe(1);

    const updatedTest = {
        testId: 0,
        test_name: 'updated test',
        status: 'complete'
    };
    // update it
    await tests.updateTest(updatedTest);

    // test conditions
    expect(testUpdateServiceSpy).toHaveBeenCalled();
    expect(tests.tests.length).toBe(1);
  });

});