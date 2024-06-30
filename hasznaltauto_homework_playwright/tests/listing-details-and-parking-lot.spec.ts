import { test, expect, Page } from '@playwright/test';
import { HomePage } from './pageobjects/home.page';
import { ListingPage } from './pageobjects/listing-details.page';
import {ReportListingItemText} from '../common/types/enums.js'
import { MyParkingLotPage } from './pageobjects/my-parking-lot.page.js';
import { EnvironmentVariables } from '../common/config/environment-variables.js';
import { 
    ADD_TO_PARKING_LOT_BUTTON_TEXT,
    ADDED_TO_PARKING_LOT_BUTTON_TEXT,
    HASZNALTAUTO_DOMAIN_URL,
    CARVERTICAL_DOMAIN_URL,
    TOTALCAR_DOMAIN_URL
  } from '../common/data/labels.js';


let page: Page;
let homePage: HomePage;
let myParkingLotPage: MyParkingLotPage;
let listingPage: ListingPage;
test.describe("Listing details page ", () => {

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    homePage = await new HomePage(page);
    listingPage = await new ListingPage(page);
    myParkingLotPage = await new MyParkingLotPage(page);
    await homePage.goto();
    await homePage.cookieModal.handleCookieModal();
    await homePage.login(
      EnvironmentVariables.user_email,
      EnvironmentVariables.user_password
    );
  })

  test.beforeEach(async () => {
    await listingPage.goto();
  });


    test(`Should redirect to carVertical Page`, async () => {
        const initialUrl = await page.url();
        expect(initialUrl).toContain(HASZNALTAUTO_DOMAIN_URL);

        const [carVerticalPage] = await Promise.all([
          page.waitForEvent('popup'),
           listingPage.carverticalLink.click()
        ]);
        await carVerticalPage.waitForLoadState();
        
        const carVerticalUrl = await carVerticalPage.url();
        expect(carVerticalUrl).toContain(CARVERTICAL_DOMAIN_URL);
        carVerticalPage.close();

        const afterClosedUrl = await page.url();
        expect(afterClosedUrl).toContain(HASZNALTAUTO_DOMAIN_URL);
        
    });

    test(`Should redirect to totalCar Page`, async () => {
      const initialUrl = await page.url();
      expect(initialUrl).toContain(HASZNALTAUTO_DOMAIN_URL);

      const [totalCarPage] = await Promise.all([
        page.waitForEvent('popup'),
         listingPage.totalCarLink.click()
      ]);
      await totalCarPage.waitForLoadState();
      
      const totalCarUrl = await totalCarPage.url();
      expect(totalCarUrl).toContain(TOTALCAR_DOMAIN_URL);
      totalCarPage.close();

      const afterClosedUrl = await page.url();
      expect(afterClosedUrl).toContain(HASZNALTAUTO_DOMAIN_URL);
      
  });

    test('Should validate the existing reporting options for a listing ', async () => {
      await listingPage.reportListingButton.click({timeout: 5000});
      await page.waitForTimeout(1000);
      expect(await listingPage.reportListingModal.modal.isVisible()).toBe(true);

      for (var value of Object.values(ReportListingItemText)){
        await page.waitForTimeout(500);

        expect(await listingPage.reportListingModal.getReportItem(value).isVisible())
        .toBe(true);

        await listingPage.reportListingModal.getReportItem(value).click();

      }
        await page.waitForTimeout(500);
        expect(await listingPage.reportListingModal.sendButton.isVisible())
        .toBe(true);
    });

    test('Should check the parking lot functionality', async () => {
      const listingId: string| null = await listingPage.listingId.textContent();
      expect(await listingPage.myParkingLotLinkNumber.textContent()).toEqual("0");

      expect(await listingPage.addToParkingLotButton.textContent()).toEqual(ADD_TO_PARKING_LOT_BUTTON_TEXT);

      await listingPage.addToParkingLotButton.click();
      await page.waitForTimeout(1000);

      expect(await listingPage.myParkingLotLinkNumber.textContent()).toEqual("1");
      expect(await listingPage.removeFromParkingLotButton.textContent()).toEqual(ADDED_TO_PARKING_LOT_BUTTON_TEXT);

      await listingPage.myParkingLotLink.click();
      expect(await myParkingLotPage.listingRow(listingId).card.isVisible());
      await listingPage.goto();
      await listingPage.removeFromParkingLotButton.click()


    });


});


  
