import { type Locator, Page } from "@playwright/test";



 export class CookieModal {

    readonly page: Page;
    readonly modal: Locator;
    readonly learnMoreButton: Locator;
    readonly agreeButton: Locator;

    constructor(page: Page){
        this.page = page
        this.modal = page.locator("xpath=//div[@data-testid='notice']");
        this.learnMoreButton = page.locator("xpath=//button[@id='didomi-notice-learn-more-button']");
        this.agreeButton = page.locator("xpath=//button[@id='didomi-notice-agree-button']");

    }

    async handleCookieModal(){

        if(await this.modal.isVisible()){
          await this.page.waitForTimeout(1000);
          await this.agreeButton.click();
          await this.page.waitForTimeout(1000);
        }
  
      }

}



