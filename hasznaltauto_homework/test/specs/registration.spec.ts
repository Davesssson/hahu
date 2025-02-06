import { EnvironmentVariables } from '../../config/environment-variables.js';
import {fieldTestRegistrationData, fieldTestData} from '../../common/data/field-test-data.js';
import RegisterPage from '../pageobjects/register.page.js';

describe(`Registration Page test`, () => {

  beforeAll(async () => {
    await browser.url(EnvironmentVariables.hahuRegisterUrl)
    await RegisterPage.cookieModal.handleCookieModal();
  });
    
  
  for (const testCase  of fieldTestData){
    it(`"${testCase.field}" field should display "${testCase.expectedErrorMessage}" error message for promport "${testCase.promptText}"`, async () => {
      await RegisterPage.getField(testCase.field).click();
      await RegisterPage.getField(testCase.field).setValue(testCase.promptText);
      await browser.pause(1000);
      await RegisterPage.clickOutside();
      await browser.pause(500);

      expect(await RegisterPage.getHelperField(testCase.field).getText())
      .toEqual(testCase.expectedErrorMessage);

      await RegisterPage.customClear(await RegisterPage.getField(testCase.field));
      //await RegisterPage.getField(testCase.field).clearValue();     <-- This should have been used in the scenario, but the WDIO default clear method did not work
      // https://github.com/webdriverio/webdriverio/issues/4482       <-- This is the github thread where you can read about it in depth.

      //I solved the problem by highlighting the whole text area, and delete it via keyboard commands.
      //Since I am developing this project on windows machine, the ctrl key might not work as intended on mac machines, so in that case that should be switched to Keys.Command.
      // Better yet, to add conditional check for the platform, and press the ctrl or cmd button accordingly
      // Even better, if the built in method works.... 
      
      //In this very example, a problem like this could have rendered the whole suite invalid, because if I haven't deleted the previous prompt content
      // adding to that the new, would have resulted in a completely different prompt text, which may, or may not have resulted in a different errorMessage.

      //I have not met with this problem before, but it was interesting to figure out nonetheless.
    });
  }


  it("Should create a registration", async () => {
      await RegisterPage.nameField.setValue(fieldTestRegistrationData.name);
      await RegisterPage.emailField.setValue(fieldTestRegistrationData.email);
      await RegisterPage.emailConfirmField.setValue(fieldTestRegistrationData.confirmEmail);
      await RegisterPage.postalCodeField.setValue(fieldTestRegistrationData.postalCode);
      await browser.pause(1000);
      await RegisterPage.postalCodeFieldOption.click();
      await RegisterPage.passwordField.setValue(fieldTestRegistrationData.password);
      await RegisterPage.passwordConfirmField.setValue(fieldTestRegistrationData.password);

      await RegisterPage.turnstile.click();  // https://www.deseret.com/2022/11/19/23412770/how-does-i-am-not-a-robot-work-recaptcha/
      await RegisterPage.ToCButton.click();
      //RegisterPage.registerButton.click();
      
      //The verification should come here, for example:
      //  - check the url does not contain the "/regisztracio"
      //  - check if the verification email sending event has arrived to the job 
      //  - check if the email has arrived
    });
});


/* Difficulties

1) The I am not a robot check 
  - This prevents the happy path of the registration
  - This could be solved with further investigation in the topic, my ideas are:
      - according to the link above, this checks the mouse movement and behaviour of the user, so
        creating something user like, it is possible that this could be bypassed
      - Do it in some other technology. I have been able to bypass such scurity measures in my own projects
        with python by manipulating the standalone browser and mouse movement (Because now when I run the script it
        is prompted that "Chrome is being controlled by automated software"), but if the standalone python script starts
        a standalone browser, the browser is not able to differentiate it from a real usecase
      - The simplest: Leave this feature out of the test and dev environment, and test it manually
  
2) PostalCodeOption element
  - PostalCodeOption DOM element disappears upon losing focus, this made locating the element pretty uncomfortable.
    I was able to locate it and solve the problem, but from automation efficiency this could be improved from SW side


3) Regardless of the fact that I was not able to create a successful registration, the SW expects the user to verify his/her
   email address via the confirm email. This is also not trivial solution, but there are a couple of ways I should be able to bypass this
   - 1) Using 10 minute email service from where I am able 
        - Either fetch it through API (did not dig that through, but )
        - Either load up the page and click on the link
   - 2) Using some mail provider which we have the API for
   - 3) Knowing the business logic behind uuid generation in the confirm link / fetching it from API and opening a new tab and searching for
        the assembled link
   - 4) Based on product expectations the test case could even end here and check the fact that the email is sent out,
        and cover the rest of the flow starting from "clicking" on the confirm email
*/