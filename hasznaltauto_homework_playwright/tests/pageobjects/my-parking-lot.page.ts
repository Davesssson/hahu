import { type Locator, Page } from "@playwright/test";
import { ReportListingModal } from "../../common/components/report-listing-modal";

class MyParkingLotListingCard {
    listingId: String;
    listingXpath: String;
    readonly page: Page;
    readonly card: Locator;
    readonly PButton: Locator;

    constructor(listingId: String, page: Page) {
        this.page = page
        this.listingId = listingId;
        this.listingXpath = `//div[text()='(${listingId})']//..//..//..//..//..//..//..//parent::div`;
        this.card = page.locator(`xpath=${this.listingXpath}`)
        this.card = page.locator(`xpath=${this.listingXpath}//div[@class='talalatisor-logo parkolo-kontener']//span//a`)
    }
  }


 export class MyParkingLotPage {
    readonly page: Page;

    constructor(page){
        this.page = page;
    }

    listingRow(id: string | null): MyParkingLotListingCard {
        if (id === null)  
            throw new Error("Listing id must not be null");
        return new MyParkingLotListingCard(id, this.page);
    }
}



