
### Prerequisites

- node : v18.9.1
- java (for report generating): "21.0.2" 2024-01-16 LTS

### Checkout this repository and run test suite

1. install node packages based on package.json
   npm install
3. setup environment (in this case it is already filled)
   copy example.env to .env
5. run a test suite
   npm run test-full // Runs both test spec files
   npm run test-listing // Runs the Listing page spec file
   npm run test-register // Runs the registration page spec file
6. generate a test report based on the results folder, it requires installed java runtime
   npm run generate-report

