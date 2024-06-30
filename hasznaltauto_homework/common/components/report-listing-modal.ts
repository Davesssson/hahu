import { WebdriverIOElement } from '../types/wdio';

export class ReportListingModal{
    private static instance: ReportListingModal;
    private constructor() {}
    public static getInstance(): ReportListingModal {
      if (!ReportListingModal.instance) {
        ReportListingModal.instance = new ReportListingModal();
      }
  
      return ReportListingModal.instance;
    }
    get modal(): WebdriverIOElement {
        return $("//form[@id='hibajelentes_form']");
    }

    get sendButton(): WebdriverIOElement {
        return $("//button[@type='submit' and @class='btn btn-primary btn-lg error-reporting__button']");
    }

    getReportItem (item: string): WebdriverIOElement{
        return $(`//label[@class='error-list__value' and contains(text(),'${item}')]`);
    }

    
}

export const ReportListingModalModalInstance = ReportListingModal.getInstance();
