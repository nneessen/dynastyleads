export const Prime = {
  name: 'Prime',
  descriptionShort: 'Highest Intent and 100% exclusive.',
  descriptionLong: 'Highest Intent and 100% exclusive.',
  costPerLead: 50,
  minPurchaseRequirement: 10,
  dataCollected: [
    'Full Name',
    'Phone Number',
    'Age (Min: 18, Max: 80)',
    'Gender',
    'Health History (Heart Attack, Stroke, Cancer, Diabetes)',
    'Beneficiary Names',
    'Mortgage Balance (Less than $100k, $100k-$200k, $200k-$300k, $300k-$400k, $500k+)',
    'State',
    'Zip Code',
    'OTP(One Time Passcode via SMS) Verified',
    'Existing Life Insurance'
  ]
};

export const Elite = {
  name: 'Elite',
  descriptionShort:
    'Highest Intent leads. These leads remain yours for 91 days if not marked sold.',
  descriptionLong:
    'Highest Intent leads. These leads remain yours for 91 days if not marked sold.',
  costPerLead: 40,
  minPurchaseRequirement: 10,
  dataCollected: [
    'Full Name',
    'Phone Number',
    'Age',
    'Gender',
    'Health History',
    'Beneficiary Names',
    'Mortgage Balance',
    'State',
    'Zip Code',
    'OTP Verified',
    'Existing Life Insurance'
  ]
};

export const Select = {
  name: 'Select',
  decriptionShort: '4-6 month old leads',
  decriptionLong: '4-6 month old leads',
  costPerLead: 5,
  minPurchaseRequirement: 1
};

export const Advantage = {
  name: 'Advantage',
  descriptionShort: '6-12 month old leads',
  descriptionLong: '6-12 month old leads',
  costPerLead: 3.5,
  minPurchaseRequirement: 1
};

export const Starter = {
  name: 'Starter',
  descriptionShort: '1-2 year old leads',
  descriptionLong: '1-2 year old leads',
  costPerLead: 2,
  minPurchaseRequirement: 1
};

export const Custom = {
  name: 'Custom',
  descriptionShort:
    'Want to experiment and build a fully customizable campaign?',
  descriptionLong:
    'Want to experiment and build a fully customizable campaign?',
  costPerLead: 'variable',
  minPurchaseRequirement: 0
};

export const MORTGAGE_PLAN_LEVELS = [
  Prime,
  Elite,
  Select,
  Advantage,
  Starter,
  Custom
];
