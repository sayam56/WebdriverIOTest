describe('webdriverUniversity -  contact us page', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url('/Contact-Us/contactus.html');
    });
    it(' valid submission - submit all information', async () => {
        const firstNameLocator = await $('//*[@name="first_name"]');
        const lastNameLocator = await $('//*[@name="last_name"]');
        const emailLocator = await $('//*[@name="email"]');
        const messageLocator = await $('//*[@name="message"]');
        const submitButtonLocator = await $("//div[@id='form_buttons']/input[@value='SUBMIT']");
        const successMessageLocator = await $('#contact_reply > h1');
        
        await firstNameLocator.setValue('John');
        await lastNameLocator.setValue('Doe');
        await emailLocator.setValue('test@email.com');
        await messageLocator.setValue('Hello this is a sample test');
        await submitButtonLocator.click();

        await expect(successMessageLocator).toHaveText('Thank You for your Message!');

        await browser.pause(5000);
    });

    it('invalid submission - not submitting all information', async () => {
        const firstNameLocator = await $('//*[@name="first_name"]');
        const lastNameLocator = await $('//*[@name="last_name"]');
        const messageLocator = await $('//*[@name="message"]');
        const submitButtonLocator = await $("//div[@id='form_buttons']/input[@value='SUBMIT']");
        const errorMessageLocator = await $("//*[text()[contains(.,'Error:')]]");
        
        await firstNameLocator.setValue('John');
        await lastNameLocator.setValue('Doe');;
        await messageLocator.setValue('Hello this is a sample test');
        await submitButtonLocator.click();

        await expect(errorMessageLocator).toHaveText(expect.stringContaining('Error: all fields are required'));

        await browser.pause(5000);
    });
});