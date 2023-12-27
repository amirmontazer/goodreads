const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'j2nh8a',
  video: false,
  viewportHeight: 1000,
  viewportWidth: 1280,

  retries: {
    runMode: 1,
    openMode: 1,
  },

  experimentalStudio: true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  e2e: {
      // We've imported your old cypress plugins here.
      // You may want to clean this up later by importing these.
      setupNodeEvents(on, config) {
      },
      //baseUrl: 'http://localhost:3000',
      specPattern: './e2e/*.cy.js'
    }
    })