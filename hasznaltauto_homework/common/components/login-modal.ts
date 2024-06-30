import { WebdriverIOElement } from '../../common/types/wdio';

export class LoginModal{
    private static instance: LoginModal;
    private constructor() {}
    public static getInstance(): LoginModal {
      if (!LoginModal.instance) {
        LoginModal.instance = new LoginModal();
      }
  
      return LoginModal.instance;
    }
    get modal(): WebdriverIOElement {
        return $("//div[@data-testid='notice']");
    }

    get emailOrUsernameInput(): WebdriverIOElement {
        return $("//input[@id='username']");
    }

    get passwordInput(): WebdriverIOElement {
        return $("//input[@id='mui-1']");
    }

    get loginButton(): WebdriverIOElement {
        return $("//button[@data-testid='loginform-submit']");
    }
}

export const LoginModalInstance = LoginModal.getInstance();
