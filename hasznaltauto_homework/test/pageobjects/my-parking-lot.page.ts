import { WebdriverIOElement } from '../../common/types/wdio';

class MyParkingLotListingCard {
  listingId: String;
  listingXpath: String;
  constructor(listingId: String) {
    this.listingId = listingId;
    this.listingXpath = `//div[text()='(${listingId})']//..//..//..//..//..//..//..//parent::div`;
  }

  get card(): WebdriverIOElement {
    return $(`${this.listingXpath}`);
  }

  get PButton(): WebdriverIOElement {
    return $(`${this.listingXpath}//div[@class='talalatisor-logo parkolo-kontener']//span//a`);
  }
}


class MyParkingLotPage {
  

    listingRow(id: String): MyParkingLotListingCard{
      return new MyParkingLotListingCard(id);
    }
  }
  
  export default new MyParkingLotPage();




