import { WebdriverIOElement } from '../../common/types/wdio';


class ListingDetailsPage {
  
    get addToParkingLotButton(): WebdriverIOElement{
      return $("//div[text()='Parkolóba rakom']");
    }

    get removeFromParkingLotButton(): WebdriverIOElement{
        return $("//div[text()='Kiveszem a parkolóból']");
      }

    get myParkingLotLink(): WebdriverIOElement{
        return $("//a[@href='https://www.hasznaltauto.hu/parkolo']")
    }

    get myParkingLotLinkNumber(): WebdriverIOElement{
        return $("//a[@href='https://www.hasznaltauto.hu/parkolo']//span")
    }

    get listingId(): WebdriverIOElement{
        return $("//div[@class='ad-id']")
    }

    get carverticalLink(): WebdriverIOElement{
        return $("//a[contains(@href, 'carvertical')]//span[text()='Előélet lekérdezése']");
    }

    get totalCarLink(): WebdriverIOElement{
      return $("//a[contains(@href, 'totalcar')]//span[text()='Előélet lekérdezése']");
    }

    get reportListingButton(): WebdriverIOElement{
      return $("//div[text()='Probléma a hirdetéssel']");
    }
  
  }
  
  export default new ListingDetailsPage();
  