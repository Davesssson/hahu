import { type Locator, Page } from "@playwright/test";
import { ReportListingModal } from "../../common/components/report-listing-modal";
import { EnvironmentVariables } from "../../common/config/environment-variables";

 export class ListingPage {

    readonly page: Page;
    readonly reportListingModal: ReportListingModal
    readonly addToParkingLotButton: Locator;
    readonly removeFromParkingLotButton: Locator;
    readonly myParkingLotLink: Locator;
    readonly myParkingLotLinkNumber: Locator;
    readonly listingId: Locator;
    readonly carverticalLink: Locator;
    readonly totalCarLink: Locator;
    readonly reportListingButton: Locator;



    constructor(page){
        this.page = page;
        this.reportListingModal = new ReportListingModal(page);
        this.addToParkingLotButton = page.locator("xpath=//div[text()='Parkolóba rakom']")
        this.removeFromParkingLotButton = page.locator("xpath=//div[text()='Kiveszem a parkolóból']")
        this.myParkingLotLink = page.locator("xpath=//a[@href='https://www.hasznaltauto.hu/parkolo']")
        this.myParkingLotLinkNumber = page.locator("xpath=//a[@href='https://www.hasznaltauto.hu/parkolo']//span")
        this.listingId = page.locator("xpath=//div[@class='ad-id']")
        this.carverticalLink = page.locator("xpath=//a[contains(@href, 'carvertical')]//span[text()='Előélet lekérdezése']")
        this.totalCarLink = page.locator("xpath=//a[contains(@href, 'totalcar')]//span[text()='Előélet lekérdezése']")
        this.reportListingButton = page.locator("xpath=//div[text()='Probléma a hirdetéssel']")

    }

    async goto() {
        await this.page.goto(EnvironmentVariables.hahuListingUrl);
    }
}



