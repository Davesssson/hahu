import { EnvironmentVariables } from '../../config/environment-variables.js';
import HomePage from '../pageobjects/home.page.js';
import ListingDetailsPage from '../pageobjects/listing-details.page.js';
import MyParkingLotPage from '../pageobjects/my-parking-lot.page.js';
import { ReportListingModalModalInstance } from '../../common/components/report-listing-modal.js';
 import {ReportListingItemText} from '../../common/types/enums.js';
import { 
  ADD_TO_PARKING_LOT_BUTTON_TEXT,
  ADDED_TO_PARKING_LOT_BUTTON_TEXT,
  HASZNALTAUTO_DOMAIN_URL,
  CARVERTICAL_DOMAIN_URL,
  TOTALCAR_DOMAIN_URL
} from '../../common/data/labels.js';


describe(`Listing Details Page Test`, () => {
  var listingId: String;
    beforeAll(async () => {
      await browser.url(EnvironmentVariables.hahuRegisterUrl)
      await HomePage.cookieModal.handleCookieModal();
      await HomePage.login(
        EnvironmentVariables.user_email,
        EnvironmentVariables.user_password
      );

    });

    beforeEach(async () => {
      await browser.url(EnvironmentVariables.hahuListingUrl);
      await HomePage.cookieModal.handleCookieModal();

    });

    it("Should redirect to carVertical Page", async () => {
      const initialUrl = await browser.getUrl();
      expect(initialUrl)
      .toContain(HASZNALTAUTO_DOMAIN_URL);

      await ListingDetailsPage.carverticalLink.openInNewTab();
      const carVerticalUrl = await browser.getUrl();
      expect(carVerticalUrl)
      .toContain(CARVERTICAL_DOMAIN_URL);

      await browser.closeCurrentTab();
      const afterClosedUrl = await browser.getUrl();
      expect(afterClosedUrl)
      .toContain(HASZNALTAUTO_DOMAIN_URL);
    });

    it("Should redirect to totalCar Page", async () => {
      const initialUrl = await browser.getUrl();
      expect(initialUrl)
      .toContain(HASZNALTAUTO_DOMAIN_URL);

      await ListingDetailsPage.totalCarLink.openInNewTab();
      const carVerticalUrl = await browser.getUrl();
      expect(carVerticalUrl)
      .toContain(TOTALCAR_DOMAIN_URL);

      await browser.closeCurrentTab();
      const afterClosedUrl = await browser.getUrl();
      expect(afterClosedUrl)
      .toContain(HASZNALTAUTO_DOMAIN_URL);

    });

    it("Should validate the existing reporting options for a listing", async () => {
      await ListingDetailsPage.reportListingButton.click();
      await browser.pause(1000);
      expect(await ReportListingModalModalInstance.modal.isDisplayed())
      .toBeTrue();      

      for (var value of Object.values(ReportListingItemText)){
        await browser.pause(500);
        expect(await ReportListingModalModalInstance.getReportItem(value).isDisplayed())
        .toBeTrue();
        await ReportListingModalModalInstance.getReportItem(value).click();
      }

      await browser.pause(1000);
      expect(await ReportListingModalModalInstance.sendButton.isDisplayed())
      .toBeTrue();
    });

    it("Should check the parking lot functionality", async () => {
      // Failing to remove the car from the parking lot will result in failure in this test case

      listingId = await ListingDetailsPage.listingId.getText();

      expect((await ListingDetailsPage.myParkingLotLinkNumber.getText()).toString())
      .toEqual("0");

      expect(await ListingDetailsPage.addToParkingLotButton.getText())
      .toEqual(ADD_TO_PARKING_LOT_BUTTON_TEXT);

      await ListingDetailsPage.addToParkingLotButton.visiblityClick();
      await browser.pause(1000); // lets wait a second for the number to change

      expect((await ListingDetailsPage.myParkingLotLinkNumber.getText()).toString())
      .toEqual("1");

      expect(await ListingDetailsPage.removeFromParkingLotButton.getText())
      .toEqual(ADDED_TO_PARKING_LOT_BUTTON_TEXT);

      await ListingDetailsPage.myParkingLotLink.click()
      expect(await MyParkingLotPage.listingRow(listingId).card.isDisplayed())
      .toBeTrue()
    });


    afterAll(async () => {
      await browser.url(EnvironmentVariables.hahuParkingLotUrl);
      await MyParkingLotPage.listingRow(listingId).PButton.click();
    });
});