const { defineConfig } = require("cypress");


module.exports = defineConfig({
  projectId: "hyexer",
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    URL:"http://google.com",
    baseUrl: 'https://calendar-challenge-six.vercel.app/',
  
  },
  e2e: {
    URL:"http://google.com",
    supportFile:"./cypress/support/e2e.js",
    setupNodeEvents(on, config){
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});