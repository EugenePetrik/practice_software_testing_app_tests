/* eslint-disable no-unused-vars */

import { faker } from '@faker-js/faker';
import { getCardExpirationDate } from '../src/utils/generateCardExpirationDate';

export enum PAYMENT_METHOD {
  BANK_TRANSFER = 'Bank Transfer',
  CASH_ON_DELIVERY = 'Cash on Delivery',
  CREDIT_CARD = 'Credit Card',
  BUY_NOW_PAY_LATER = 'Buy Now Pay Later',
  GIFT_CARD = 'Gift Card',
}

export interface CreditCard {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
}

export const CREDIT_CARD_DATA: CreditCard = {
  cardNumber: '1111-1111-1111-1111',
  expirationDate: getCardExpirationDate(),
  cvv: faker.finance.creditCardCVV(),
  cardHolderName: `${faker.person.firstName()} ${faker.person.lastName()}`.replace(/[^a-zA-Z]/g, ''),
};
