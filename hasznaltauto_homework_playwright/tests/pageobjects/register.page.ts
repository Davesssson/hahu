import { type Locator, Page } from "@playwright/test";
import { CookieModal } from "../../common/components/cookie-modal";
import { RegisterPageFields } from "../../common/types/enums";
import { EnvironmentVariables } from "../../common/config/environment-variables";


 export class RegisterPage {

    readonly page: Page;
    readonly proba: Locator;
    readonly cookieModal: CookieModal;
    readonly nameField: Locator;
    readonly nameFieldHelperText: Locator;
    readonly emailField: Locator;
    readonly emailFieldHelperText: Locator;
    readonly emailConfirmField: Locator;
    readonly emailConfirmFieldHelperText: Locator;
    readonly postalCodeField: Locator;
    readonly postalCodeFieldHelperText: Locator;
    readonly postalCodeFieldOption: Locator;
    readonly passwordField: Locator;
    readonly passwordFieldHelperText: Locator;
    readonly passwordConfirmedField: Locator;
    readonly passwordConfirmedHelperText: Locator;
    readonly turnstile: Locator;
    readonly ToCButton: Locator;
    readonly registerButton: Locator;
    readonly dummy: Locator


    constructor(page){
        this.page = page;
        this.proba = page.getByRole('link', { name: 'Get started' });
        this.cookieModal = new CookieModal(page);
        this.nameField = page.locator("xpath=//input[@name='name']");
        this.nameFieldHelperText = page.locator("xpath=//p[@id='mui-1-helper-text'  and contains(text(),' ')]");
        this.emailField = page.locator("xpath=//input[@name='email']");
        this.emailFieldHelperText = page.locator("xpath=//p[@id='mui-2-helper-text']");
        this.emailConfirmField = page.locator("xpath=//input[@name='confirmEmail']");
        this.emailConfirmFieldHelperText = page.locator("xpath=//input[@name='confirmEmail']");
        this.postalCodeField = page.locator("xpath=//input[@id='mui-5']");
        this.postalCodeFieldHelperText = page.locator("xpath=//input[@id='mui-5-helper-text']");
        this.postalCodeFieldOption = page.locator("xpath=//div[@role='presentation']");
        this.passwordField = page.locator("xpath=//input[@name='password']");
        this.passwordFieldHelperText = page.locator("xpath=//p[@id='mui-6-helper-text']");
        this.passwordConfirmedField = page.locator("xpath=//input[@name='confirmPassword']");
        this.passwordConfirmedHelperText = page.locator("xpath=//input[@name='confirmPassword']");
        this.turnstile = page.locator("xpath=//div[@id='cf-turnstile']");
        this.ToCButton = page.locator("xpath=//span[contains(text(), 'Elolvastam és elfogadom')]//parent::label//input");
        this.registerButton = page.locator("xpath=//button[@data-testid='submit-button']");
        this.dummy = page.locator("xpath=//div[text()='* A csillaggal jelölt mezők kitöltése kötelező.']")

    }

    async goto() {
        await this.page.goto(EnvironmentVariables.hahuRegisterUrl);
    }

    getField(field:RegisterPageFields){
      switch(field){
        case RegisterPageFields.NAME:
          return this.nameField;
        case RegisterPageFields.PASSWORD:
          return this.passwordField;
        case RegisterPageFields.EMAIL:
          return this.emailField;
        default:
          return this.nameField;
      }
    }
  
    getHelperField(field:RegisterPageFields){
      switch(field){
        case RegisterPageFields.NAME:
          return this.nameFieldHelperText;
        case RegisterPageFields.PASSWORD:
          return this.passwordFieldHelperText;
        case RegisterPageFields.EMAIL:
          return this.emailFieldHelperText;
        default:
          return this.nameField;
      }
    }

}



