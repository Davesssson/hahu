import { Options } from '@wdio/types';

import { EnvironmentVariables } from './environment-variables.js';
import { VisibilityObject } from '../common/types/types.js';

export const config = {
  maxInstances: 1,
  logLevel: EnvironmentVariables.logLevel as Options.WebDriverLogTypes,
  bail: EnvironmentVariables.bail,
  waitforTimeout: EnvironmentVariables.waitForTimeout,
  waitforInterval: EnvironmentVariables.waitForInterval,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  specs: Array(1).fill(`../test/specs/${EnvironmentVariables.configSpecs}`),
  suites: {
    full: [
      '../test/specs/listing-details-and-parking-lot.spec.ts',
      '../test/specs/registration.spec.ts'
    ],
    listingPage: ['../test/specs/listing-details-and-parking-lot.spec.ts'],
    registrationPage: ['../test/specs/registration.spec.ts'],

  },
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          // '--headless=new',
          '--disable-gpu',
          '--strictSSL',
          '--window-size=1920,1200',
          '--ignore-certificate-errors',
          '--ignore-ssl-errors',
        ],
        extensions: [],
      },
    },
  ],
  services: ['chromedriver'],
  framework: 'jasmine',
  reporters: [
    [
      'allure',
      {
        outputDir: 'result',
        addConsoleLogs: true,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
    [
      'junit',
      {
        outputDir: 'junit',
        errorOptions: {
          error: 'message',
          failure: 'message',
          stacktrace: 'stack',
        },
        outputFileFormat: function (options: any) {
          return `wdio-${options.cid}-result.xml`;
        },
      },
    ],
  ],

  jasmineOpts: {
    defaultTimeoutInterval: 1000000,
    stopOnSpecFailure: false,
  },
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },

  before: function (caps, specs, browser) {
    browser.addCommand(
      'visiblityClick',
      async function (param: VisibilityObject = { waitForDisplayedTimeout: 1000, pauseTime: 2000 }) {
        await this.scrollIntoView({ block: 'center', inline: 'center' });
        await this.waitForDisplayed({ timeout: param.waitForDisplayedTimeout });
        await browser.pause(param.pauseTime);
        await this.click();
      },
      true
    );
    browser.addCommand(
      'openInNewTab',
      async function () {
        await this.click();
        await browser.pause(1000);
        const ids = await browser.getWindowHandles() ;
        await browser.switchToWindow(ids[1]);

      },
      true
    );

    browser.addCommand(
      'closeCurrentTab',
      async function () {
        const ids = await browser.getWindowHandles() ;
        await this.closeWindow()
        await this.switchToWindow(ids[0]);
      }
      
    );
  },
  beforeTest: async function (test, context) {
    console.log(test.fullName);
    await browser.setWindowSize(1920, 1200);
  },
  afterTest: async function (test, context, { error }) {
    if (error !== undefined) {
      await browser.takeScreenshot();
      console.log('!! Test failed at this url: ' + (await browser.getUrl()));
    }
  },
};
