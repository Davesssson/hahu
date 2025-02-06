import { test, expect, Page } from '@playwright/test';
import {fieldTestData,fieldTestRegistrationData} from '../common/data/field-test-data';
import { RegisterPage } from './pageobjects/register.page';

let page: Page;
let registerPage: RegisterPage;
test.describe("Registration Page", () => {

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    registerPage = await new RegisterPage(page);
    await registerPage.goto();
    await registerPage.cookieModal.handleCookieModal();
  })

  for (const testCase of fieldTestData) {
    test(`"${testCase.field}" field should display "${testCase.expectedErrorMessage}" error message for promport "${testCase.promptText}"`, async () => {
      await registerPage.getField(testCase.field).click();
      await registerPage.getField(testCase.field).fill(testCase.promptText);
      await page.waitForTimeout(1000);
      await registerPage.dummy.click();
      await page.waitForTimeout(2000);

      await expect(registerPage.getHelperField(testCase.field))
      .toHaveText(testCase.expectedErrorMessage)

      await page.waitForTimeout(1000);
      await registerPage.getField(testCase.field).click();
      await registerPage.getField(testCase.field).clear();
    });
  }
    
    test('Registration flow', async () => {
      await registerPage.nameField.fill(fieldTestRegistrationData.name);
      await registerPage.emailField.fill(fieldTestRegistrationData.email);
      await registerPage.emailConfirmField.fill(fieldTestRegistrationData.confirmEmail);
      await registerPage.postalCodeField.fill(fieldTestRegistrationData.postalCode.toString());
      await page.waitForTimeout(1000);
      await registerPage.postalCodeFieldOption.click();
      await registerPage.passwordField.fill(fieldTestRegistrationData.password);
      await registerPage.passwordConfirmedField.fill(fieldTestRegistrationData.confirmPassword);
    
      await registerPage.turnstile.click();
      await registerPage.ToCButton.click();
      await page.waitForTimeout(1000);
    
      await registerPage.registerButton.click();
 
    });

    test.afterAll(async () => {
      await page.close();
    });

});
