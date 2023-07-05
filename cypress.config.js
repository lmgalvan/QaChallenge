const { defineConfig } = require("cypress");


module.exports = defineConfig({
  projectId: "hyexer",
  chromeWebSecurity: false,
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