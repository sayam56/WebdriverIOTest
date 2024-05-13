describe('advanced element interactions - examples', () => {
    beforeEach(async function() {
        await browser.maximizeWindow();
    });

    it('inputs', async () => {
        await browser.url("/Contact-Us/contactus.html");
        const firstNameTextField = $("[name='first_name']");

        //You can also use unicode characters like Left arrow or Back spaces:
        //https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
        //Doesn’t Clear element before typing:
        //https://webdriver.io/docs/api/element/addValue
        await firstNameTextField.addValue("Add your text here ");
        await firstNameTextField.addValue("My added text");
        //await browser.pause(2000);

        //Send a sequence of key strokes to an element (clears element before typing)
        //Keyword: clears before typing:
        //https://webdriver.io/docs/api/element/setValue
        await firstNameTextField.setValue("Hello how are you?");
        //await browser.pause(2000);

        //Clear a <textarea> or text <input> element’s value:
        //https://webdriver.io/docs/api/element/clearValue
        await firstNameTextField.clearValue();
        //await browser.pause(2000);
    });

    it('dropdowns', async() => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");

        //selectByAttribute
        //https://webdriver.io/docs/api/element/selectByAttribute
        const programmingLanguage_DropdownList = await $('#dropdowm-menu-1');
        await programmingLanguage_DropdownList.selectByAttribute('value', 'python');
        await expect(programmingLanguage_DropdownList).toHaveValueContaining('python');
        //await browser.pause(2000);

        //selectByIndex
        //https://webdriver.io/docs/api/element/selectByIndex
        const tech_DropdownList = await $('#dropdowm-menu-2');
        await tech_DropdownList.selectByIndex(2);
        await expect(tech_DropdownList).toHaveValueContaining('TestNG', {ignoreCase: true});
        //await browser.pause(2000);

        //selectByVisibleText
        //https://webdriver.io/docs/api/element/selectByVisibleText
        const frontendLanguage_DropdownList = await $('#dropdowm-menu-3');
        await frontendLanguage_DropdownList.selectByVisibleText('CSS');
        await expect(frontendLanguage_DropdownList).toHaveValueContaining('CSS', {ignoreCase: true});
        //await browser.pause(2000);
    });

    it('state commands', async() => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");

        //isDisplayed: https://webdriver.io/docs/api/element/isDisplayed
        //toBeEnabled: https://webdriver.io/docs/api/expect-webdriverio/#tobeenabled
        const lettuceRadioButton = await $('[value="lettuce"]');
        const lettuceRadioButton_isDisplayed = await lettuceRadioButton.isDisplayed();
        await expect(lettuceRadioButton_isDisplayed).toEqual(true);
        await expect(lettuceRadioButton).toBeEnabled();

        //isClickable: https://webdriver.io/docs/api/element/isClickable
        const lettuceRadioButton_isClickable = await lettuceRadioButton.isClickable();
        await expect(lettuceRadioButton_isClickable).toEqual(true);

        //isEnabled: https://webdriver.io/docs/api/element/isEnabled
        //toBeDisabled: https://webdriver.io/docs/api/expect-webdriverio/#tobedisabled
        const cabbageRadioButton = await $('[value="cabbage"]');
        const cabbageRadioButton_isEnabled = await cabbageRadioButton.isEnabled();
        await expect(cabbageRadioButton_isEnabled).toEqual(false);
        await expect(cabbageRadioButton).toBeDisabled();
    });
    it('actions', async() => {
        await browser.url("/Actions/index.html#");

        //Drag & Drop
        const elem = await $('#draggable');
        const target = await $('#droppable');
        await elem.dragAndDrop(target);
        //await browser.pause(3000);

        //double click
        const doubleClick_Button = await $('#double-click');
        await doubleClick_Button.doubleClick();
        //await browser.pause(3000);

        //mouse over
        await $("//button[text()='Hover Over Me First!']").moveTo();
        const firstLink = await $("(//*[text()='Link 1'])[1]");
        await firstLink.waitForClickable();
        await firstLink.click();
        //await browser.pause(3000);
    });
    it('handling windows', async () => {
        await browser.url("https://www.webdriveruniversity.com/");
        await browser.newWindow("https://www.automationteststore.com/");

        let currentWindow_Title = await browser.getTitle();
        console.log(`>>Current Window Title: ${currentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('automationteststore');

        await browser.switchWindow('webdriveruniversity.com');
        let parentWindow_Title = await browser.getTitle();
        console.log(`>>Parent Window Title: ${parentWindow_Title}`);
        await expect(browser).toHaveUrlContaining('webdriveruniversity.com');

        await $('#contact-us').click();
        await browser.switchWindow('automationteststore');
        await browser.closeWindow();

        await browser.switchWindow('contactus');
        await browser.closeWindow();

        await browser.switchWindow('webdriveruni');
        console.log(await browser.getTitle());
        //await browser.pause(3000);
    });
    it('IFrames', async () => {
        await browser.url("/IFrame/index.html");
        const iframe = await $('#frame');
        await browser.switchToFrame(iframe);
        await $("//a[text()='Our Products']").click();
        //await browser.pause(3000);
        await browser.switchToParentFrame();
        //await browser.pause(3000);
    });
    it('Alerts', async () => {
        await browser.url("/Popup-Alerts/index.html");
        await $('#button1').click();
        await browser.acceptAlert();

        await $('#button4').click();
        const alertText = await browser.getAlertText();
        await expect(alertText).toEqual('Press a button!');

        await browser.acceptAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed OK!');

        await $('#button4').click();
        await browser.dismissAlert();
        await expect($('#confirm-alert-text')).toHaveText('You pressed Cancel!');
    });

    it('File Upload', async () => {
        await browser.url("/File-Upload/index.html");
        await $('#myFile').addValue(`${process.cwd()}/data/dummy_file.txt`);
        await $('#submit-button').click();
    });

    it('JS Execute', async() => {
        await browser.url("/Hidden-Elements/index.html");
        await browser.execute(() => {
            return document.getElementById("not-displayed").setAttribute("id", "");
        });

        await browser.execute(() => {
            return document.body.style.backgroundColor = "tomato";
        })
    });
});