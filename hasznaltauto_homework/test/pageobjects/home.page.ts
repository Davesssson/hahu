import { WebdriverIOElement } from '../../common/types/wdio';
import { LoginModalInstance, LoginModal } from '../../common/components/login-modal.js';
import { CookieModalInstance, CookieModal } from '../../common/components/cookie-modal.js';

class HomePage {

  get loginModal(): LoginModal {
    return LoginModalInstance;
  }

  get cookieModal(): CookieModal {
    return CookieModalInstance;
  }

  get loginButton(): WebdriverIOElement{
    return $("//li//a[@data-toggle='login']")
  }

  login = async (email: string, password: string): Promise<void> => {
    await this.loginButton.visiblityClick();
    await browser.pause(1000);

    await this.loginModal.emailOrUsernameInput.setValue(email);

    await browser.pause(1000);
    await this.loginModal.passwordInput.setValue(password);

    await browser.pause(1000);

    await this.loginModal.loginButton.visiblityClick()
    await browser.pause(3000);
  };

}

export default new HomePage();
