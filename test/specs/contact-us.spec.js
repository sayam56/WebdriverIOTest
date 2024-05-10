describe('webdriveruniversity - contact us page', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url('/Contact-Us/contactus.html');
        console.log(`>>Browser Object: ${JSON.stringify(browser)}`);
    });

    it('valid submission - submit all information', async() => {
        const firstName = await $('//*[@name="first_name"]');
        const lastName = await $('//*[@name="last_name"]');
        const emailAddress = await $('//*[@name="email"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//input[@value="SUBMIT"]');

        await firstName.setValue("Joe");
        await lastName.setValue("Blogs");
        await emailAddress.setValue("joe_blogs123@mail.com");
        await message.setValue("Hello how are you?");

        //await browser.debug();
        await submitButton.click();

        const successfulSubmissionHeader = $('#contact_reply > h1');
        console.log(`successfulSubmissionHeader Element: ` + JSON.stringify(await successfulSubmissionHeader));
        await expect(successfulSubmissionHeader).toHaveText('Thank You for your Message!');
		
		//Jest Assertion:
        //const successfulSubmissionHeader2 = await $('#contact_reply > h1').getText();
        //expect(successfulSubmissionHeader2).toEqual('Thank You for your Message!555');
    });

    it('invalid submission - dont submit all information', async() => {
        const firstName = await $('//*[@name="first_name"]');
        await firstName.setValue("Sarah");

        const lastName = await $('//*[@name="last_name"]');
        await lastName.setValue("Blogs");

        const message = await $('//*[@name="message"]');
        await message.setValue("Hello world!");

        const submitButton = await $('//input[@value="SUBMIT"]');
        await submitButton.click();

        const successfulSubmissionHeader = $('body');
        await expect(successfulSubmissionHeader).toHaveTextContaining(['Error: all fields are required', 'Error: Invalid email address']);

    });
});