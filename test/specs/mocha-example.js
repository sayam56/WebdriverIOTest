describe.skip('Description of test suite', () => {
    before(() => {
        console.log("This will run ONCE before this entire block (the first run)");
    });

    after(() => {
        console.log("This will run ONCE after this entire block (After the last run)");
    });

    beforeEach(() => {
        console.log("This will run before EACH of the individual tests");
    });

    afterEach(() => {
        console.log("This will run after EACH of the individual tests");
    });

    it('Individual test 1', () =>{
        console.log("Executed test 1");
    });

    it('Individual test 2', () => {
        console.log("Executed test 2");
    });
})