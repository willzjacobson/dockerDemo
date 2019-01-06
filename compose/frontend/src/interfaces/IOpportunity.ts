export interface IOpportunity {
  accountId: string | null;
  advances: number | null;
  amountFinanced: number | null;
  amountReceived: number | null;
  amountRequested: number | null;
  ancDocumentType: string | null;
  assetClass: string | null;
  bank: IBank | null;
  business: IBusiness | null;
  buyRate: number | null;
  checkout: boolean;
  contractsOutDate: string | null;
  creditModel: string | null;
  creditScore: number | null;
  crossCorpEmail: string | null;
  dealType: string | null;
  disbursementAmount: number | null;
  docFee: number | null;
  documentType: string | null;
  downPayment: number | null;
  effectiveInterestRate: number | null;
  equipment: IEquipment | null;
  equipments: IEquipment[] | null;
  estimatedCommission: number | null;
  estimatedGM: number | null;
  estimatedVolume: number | null;
  expressId: number | null;
  flDocStampFee: number | null;
  fraud: boolean | null;
  fundedDate: string | null;
  fundingId: string | null;
  fundingSource: string | null;
  grade: string | null;
  grossAnnualSales: number | null;
  id: string | null;
  initialStepPayment: number | null;
  insurance: IInsurance | null;
  internal: boolean | null;
  isPrime: boolean;
  lastExpressRunBy: string | null;
  lastExpressRunDate: string | null;
  lastPushToDocsBy: string | null;
  lastPushToDocsDate: string | null;
  leadId: string | null;
  leadType: string | null;
  lender: string | null;
  lenders: ILender | null;
  maturityDate: string | null;
  numberOfEmployees: number | null;
  numberofExpressRuns: number | null;
  numberofExpressRunsBySales: number | null;
  numberofPushedToDocs: number | null;
  opportunityNumber: string | null;
  originationFee: number | null;
  originationFeePercent: number | null;
  owners: IContact[] | null;
  payment: number | null;
  paymentFrequency: string | null;
  payments: number | null;
  pointsInStream: number | null;
  powerUnits: number | null;
  programType: string | null;
  repaymentAmount: number | null;
  residual: string | null;
  salesBusinessUnit: string | null;
  salesMember: string | null;
  signers: IContact[] | null;
  siteFee: number | null;
  skipFundingRole: boolean;
  stage: string | null;
  stageName: string | null;
  subTotal: number | null;
  sumOfAdvances: number | null;
  term: number | null;
  termRequested: number | null;
  totalDue: number | null;
  vendor: IVendor | null;
}

interface IBank {
  name: string | null;
  nameOnAccount: string | null;
  accountNumber: string | null;
  routingNumber: string | null;
  address: IAddress | null;
}

interface IBusiness {
  addresses: IAddress[] | null;
  alternateCompanyName: string | null;
  companyName: string | null;
  homeBased: boolean | null;
  industry: IIndustry | null;
  landlord: string | null;
  legalEntity: string | null;
  legalEntityInternal: string | null;
  medical: IMedical | null;
  rentMortgageAmount: number | null;
  startDate: string | null;
  stateOfIncorporation: string | null;
  taxId: string | null;
  timeInBusiness: number | null;
  website: string | null;
  yearsCurrentOwner: number | null;
}

interface IIndustry {
  code: string | null;
  name: string | null;
}

interface IMedical {
  practiceType: string | null;
  numberOfPhysicians: number;
}

interface IInsurance {
  name: string | null;
  contactName: string | null;
  phone: string | null;
  fax: string | null;
  policyNumber: string | null;
}

interface IAddress {
  city: string | null;
  county: string | null;
  fax: string | null;
  line1: string | null;
  line2: string | null;
  mobilePhone: string | null;
  postalCode: string | null;
  state: string | null;
  telephone: string | null;
}

interface IEquipment {
  address: IAddress | null;
  aircraftMission: string | null;
  code: string | null;
  condition: string | null;
  cost: number | null;
  description: string | null;
  make: string | null;
  model: string | null;
  name: string | null;
  quantity: number | null;
  year: number | null;
}

interface IContact {
  address: IAddress | null;
  citizenshipStatus: string | null;
  contactId: string | null;
  dob: string | null;
  email: string | null;
  employerName: string | null;
  employmentStartDate: string | null;
  firstName: string | null;
  grossMonthlyIncome: number | null;
  homeResidenceOwnership: string | null;
  lastName: string | null;
  maritalStatus: string | null;
  middle: string | null;
  moveInDate: string | null;
  otherMonthlyIncome: number | null;
  ownershipPercent: number | null;
  rentMortgageAmount: number | null;
  ssn: string | null;
  title: string | null;
  yearsIndustryExperience: number | null;
}

interface ILender {
  id: string | null;
  name: string | null;
  status: string | null;
  approvalAmount: number | null;
  transactionId: string | null;
  buyRate: number | null;
  term: number | null;
}

interface IVendor {
  address: IAddress | null;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  itemDescription: string | null;
  dateNeeded: string | null;
  externalVendorId: string | null;
  telephone: string | null;
}
