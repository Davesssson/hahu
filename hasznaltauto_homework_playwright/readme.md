
### Prerequisites

- node : v18.9.1
- java (for report generating): "21.0.2" 2024-01-16 LTS

### Checkout this repository and run test suite

1. install node packages based on package.json
   npm install
3. setup environment (in this case it is already filled)
   copy example.env to .env
5. run a test suite
   NODE_ENV=development npx playwright test  // Runs both test spec files
   NODE_ENV=development npx playwright test tests/listing-details-and-parking-lot.spec.ts  // Runs the Listing page spec file
   NODE_ENV=development npx playwright test tests/registration.spec.ts // Runs the registration page spec file
6. generate a test report based on the results folder, it requires installed java runtime
   npm run generate-report

