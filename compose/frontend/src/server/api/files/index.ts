import axios from 'axios';
import express from 'express';
import { expressServiceCore } from '../../../config';

import bluebird from 'bluebird';

const dummyFiles = [
  {
    categories: [
      {
        _id: 'Credit',
        name: 'Credit',
        rootNode: true,
        children: [
          'CreditApp',
          'FinancialDocs',
          'CreditReport',
          'VendorInvoice',
          'FinalApproval-Enverto',
          'ConditionalApproval-Syndication',
          'FinalConditionalApproval-Syndication',
          'Verbal',
          'CreditDecisionReport',
          'ProofOfPaymentCustomer',
          'CapitalReductionCustomer',
          'ProofOfTaxLienPaymentPlanOrRelease',
        ],
      },
      {
        _id: 'CreditDecisionReport',
        name: 'Credit Decision Report',
        children: [],
      },
    ],
    createdDate: '2018-12-07T19:22:34.644Z',
    filename: 'Siemens_CDR_4004_testCompany_12-07-18 19:22:34.pdf',
    id: '5c0b38fe9c6de82c88ea38d4',
  },
  {
    categories: [
      {
        _id: 'Funding',
        name: 'Funding',
        rootNode: true,
        children: ['FundingDoc', 'InternalDoc', 'BrokerPackage', 'Titling'],
      },
      {
        _id: 'FundingDoc',
        name: 'Funding Doc',
        children: [
          'FundingPackage',
          'Agreement',
          'VoidedCheck',
          'UCCSearch',
          'LoanProceeds',
          'Invoice',
          'SiteInspection',
          'DepositCheck',
          'DriversLicense',
          'Title',
          'MSO',
          'BillOfSale',
          'Insurance',
          'Verbal2',
          'InternalSignoffSheet',
          'GAPInvoice',
          'PaymentInstructions',
          'PricingSheet',
          'TaxExemption',
          'ProofOfTaxRate',
          'Assignment',
          'GAPAddendum',
          'Addendum',
          'Docs',
          'Supplementary',
          'CertificateOfInsurance',
          'Titling',
          'UCCFiling',
          'DocSummary',
          'AddendumSummary',
          'BillOfSalesSummary',
        ],
      },
      {
        _id: 'Assignment',
        children: [],
        name: 'Assignment',
      },
    ],
    createdByUserId: '',
    createdDate: '2018-12-08T15:25:30.000Z',
    filename: 'basic ghost.jpg',
    id: '5c0c52ecf0d3841d28cdce46',
  },
];

export async function get(req: express.Request, res: express.Response) {
  try {
    // DEMO LOGIC
    // kill time to mock real request
    await bluebird.delay(1000);
    // For demo's sake, flip a coin to succeed or fail
    const rand = Math.random();
    if (rand > 0.5) {
      return res.status(200).send(dummyFiles);
    } else {
      return res.status(500).send(new Error('Your request failed, go home.'));
    }

    // ACTUAL HTTP(S) REQUEST
    // const response = await axios.get(
    //   `${expressServiceCore.uri}files/?expressId=${req.query.expressId}`,
    // );

    // if (!response) {
    //   throw new Error(
    //     'Empty response from getFiles route but no error.... weird!',
    //   );
    // }

    // res.status(200).json(response.data);
  } catch (e) {
    return res.status(500).send({ error: e });
  }
}
