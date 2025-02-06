import { type Locator, Page } from "@playwright/test";

 export class ReportListingModal {

    readonly page: Page;
    readonly modal: Locator;
    readonly sendButton: Locator;


    constructor(page: Page){
        this.page = page
        this.modal = page.locator("xpath=//form[@id='hibajelentes_form']");
        this.sendButton = page.locator("xpath=//button[@type='submit' and @class='btn btn-primary btn-lg error-reporting__button']");
    }

    getReportItem(item: string): Locator{
        return this.page.locator(`xpath=//label[@class='error-list__value' and contains(text(),'${item}')]`);
    }

}
