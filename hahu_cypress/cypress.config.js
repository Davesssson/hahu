const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: false,
      json: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
