import { join } from 'path';

const env =
  process.env.NODE_ENV === 'production'
    ? ''
    : process.env.NODE_ENV === 'staging'
    ? '-staging'
    : process.env.NODE_ENV === 'integration'
    ? '-integration'
    : process.env.NODE_ENV === 'qa2'
    ? '-qa2'
    : process.env.NODE_ENV === 'qa'
    ? '-qa'
    : '-staging';

export const API_HOST = process.env.API_HOST || 'API_HOST not provided';
export const PORT = process.env.PORT || 8080;
export const NODE_ENV = process.env.NODE_ENV;
export const WEBPACK_OUTPUT_DIR = join(__dirname, '../../dist');

export const creditBureauService = {
  uri: `https://currencycreditbureau${env}.azurewebsites.net/`,
};
export const creditService = {
  uri: `https://currencycreditservice${env}.azurewebsites.net/`,
};
export const crmService = {
  uri: `https://currencysalesforce${env}.azurewebsites.net/`,
};
export const emailService = {
  uri: `http://currencyemailservice${env}.azurewebsites.net/`,
};
export const expressServiceCore = {
  uri: `https://expressservicecore${env}.azurewebsites.net/`,
};
export const fileService = {
  uri: `https://currencyfileservice${env}.azurewebsites.net/`,
};
export const fraudService = {
  uri: `https://currencyfraudservice${env}.azurewebsites.net/`,
};
export const lenderService = {
  uri: `https://currencylenderservice${env}.azurewebsites.net/`,
};
export const rateService = {
  uri: `http://currencyrateservice${env}.azurewebsites.net/`,
};
export const uploadService = {
  uri: `https://documentupload${env}.azurewebsites.net/`,
};
export const vendorService = {
  uri: `https://currencyvendorservice${env}.azurewebsites.net/`,
};
