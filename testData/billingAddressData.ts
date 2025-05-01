import { faker } from '@faker-js/faker';

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export const BILLING_ADDRESS_DATA: BillingAddress = {
  street: faker.location.street(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  zipCode: faker.location.zipCode('#####'),
};
