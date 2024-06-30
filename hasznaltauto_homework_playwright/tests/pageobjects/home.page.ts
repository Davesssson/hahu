import { type Locator, Page } from "@playwright/test";
import { CookieModal } from "../../common/components/cookie-modal";
import { LoginModal } from "../../common/components/login-modal";
import { EnvironmentVariables } from "../../common/config/environment-variables";


 export class HomePage {

    readonly page: Page;
    readonly cookieModal: CookieModal;
    readonly loginModal: LoginModal;
    readonly loginButton: Locator;

    constructor(page){
        this.page = page;
        this.loginModal = new LoginModal(page);
        this.cookieModal = new CookieModal(page);
        this.loginButton = page.locator("xpath=//li//a[@data-toggle='login']");

    }

    async goto() {
        await this.page.goto(EnvironmentVariables.hahuHomeUrl);
    }

    login = async (email: string, password: string): Promise<void> => {
        await this.loginButton.click();
        await this.page.waitForTimeout(1000);
    
        await this.loginModal.emailOrUsernameInput.fill(email);
    
        await this.page.waitForTimeout(1000);
        await this.loginModal.passwordInput.fill(password);
    
        await this.page.waitForTimeout(1000);
    
        await this.loginModal.loginButton.click()
        await this.page.waitForTimeout(1000);
      };
}
