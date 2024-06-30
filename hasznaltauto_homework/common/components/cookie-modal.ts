import { WebdriverIOElement } from '../../common/types/wdio';

export class CookieModal{
    private static instance: CookieModal;
    private constructor() {}
    public static getInstance(): CookieModal {
      if (!CookieModal.instance) {
        CookieModal.instance = new CookieModal();
      }
  
      return CookieModal.instance;
    }
    get modal(): WebdriverIOElement {
        return $("//div[@data-testid='notice']");
    }

    get learnMoreButton(): WebdriverIOElement {
        return $("//button[@id='didomi-notice-learn-more-button']");
    }

    get agreeButton(): WebdriverIOElement {
        return $("//button[@id='didomi-notice-agree-button']");
    }

    async handleCookieModal(){

      if(await this.modal.isDisplayed()){
        await browser.pause(1000);
        await this.agreeButton.click();
        await browser.pause(1000);
      }

    }
}

export const CookieModalInstance = CookieModal.getInstance();
