import { CookieModal, CookieModalInstance } from '../../common/components/cookie-modal.js';
import { RegisterPageFields } from '../../common/types/enums.js';
import { WebdriverIOElement } from '../../common/types/wdio';
import { Key } from 'webdriverio'

class RegisterPage {

  get nameField(): WebdriverIOElement {
    return $("//input[@name='name']");
  }

  get nameFieldHelperText(): WebdriverIOElement {
    return $("//p[@id='mui-1-helper-text'  and contains(text(),' ')]");
  }

  get emailField(): WebdriverIOElement {
    return $("//input[@name='email']");
  }

  get emailFieldHelperText(): WebdriverIOElement {
    return $("//p[@id='mui-2-helper-text']");
  }

  get emailConfirmField(): WebdriverIOElement {
    return $("//input[@name='confirmEmail']");
  }

  get emailConfirmFieldHelperText(): WebdriverIOElement {
    return $("//input[@name='confirmEmail']");
  }

  get postalCodeField(): WebdriverIOElement {
    return $("//input[@id='mui-5']");
  }

  get postalCodeFieldHelperText(): WebdriverIOElement {
    return $("//input[@id='mui-5-helper-text']");
  }

  get postalCodeFieldOption(): WebdriverIOElement{
    return $("//div[@role='presentation']")
  }

  get passwordField(): WebdriverIOElement {
    return $("//input[@name='password']");
  }

  get passwordFieldHelperText(): WebdriverIOElement {
    return $("//p[@id='mui-6-helper-text']");
  }

  get passwordConfirmField(): WebdriverIOElement {
    return $("//input[@name='confirmPassword']");
  }

  get passwordConfirmFieldHelperText(): WebdriverIOElement {
    return $("//input[@name='confirmPassword']");
  }

  get turnstile(): WebdriverIOElement{
    return $("//div[@id='cf-turnstile']");
  }

  get ToCButton(): WebdriverIOElement{
    return $("//span[contains(text(), 'Elolvastam és elfogadom')]//parent::label//input")
  }

  get registerButton(): WebdriverIOElement{
    return $("//button[@data-testid='submit-button']")
  }

  get cookieModal(): CookieModal {
    return CookieModalInstance;
  }

  clickOutside() {
    $("//div[text()='* A csillaggal jelölt mezők kitöltése kötelező.']").click();
  }

  getField(field:RegisterPageFields) : WebdriverIOElement{
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

  getHelperField(field:RegisterPageFields) : WebdriverIOElement{
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

  customClear = async(element: WebdriverIOElement) : Promise<void> => {
    await element.click();
    await browser.pause(500);
    await browser.keys([Key.Ctrl, 'a']);
    await browser.keys(Key.Delete);
  }

  deleteContentAllField = async (): Promise<void> => {
    for (var field of Object.values(RegisterPageFields)){
      const element = await this.getField(field);
      element.click();
      this.customClear(element);
    }
  };

}

export default new RegisterPage();
