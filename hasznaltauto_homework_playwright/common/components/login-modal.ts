import { type Locator, Page } from "@playwright/test";



 export class LoginModal {

    readonly page: Page;
    readonly modal: Locator;
    readonly emailOrUsernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page
        this.modal = page.locator("xpath=//div[@data-testid='notice']");
        this.emailOrUsernameInput = page.locator("xpath=//input[@id='username']");
        this.passwordInput = page.locator("xpath=//input[@id='mui-1']");
        this.loginButton = page.locator("xpath=//button[@data-testid='loginform-submit']")

    }

}
