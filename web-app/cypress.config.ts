import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    video: false,
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2etests/**/*.cy.{js,jsx,ts,tsx}'
  }
});
