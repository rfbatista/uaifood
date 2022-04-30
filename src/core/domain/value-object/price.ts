import { createMoney, CurrencyEnum } from '@core/domain/value-object/money';

interface Price {
  amount(): number;
  currency(): CurrencyEnum;
  updateAmount(amount: number, currency?: CurrencyEnum): void;
}

const createPrice = (amount: number): Price => {
  let currentMoney = createMoney(amount);
  return {
    amount: () => {
      return currentMoney.amount;
    },
    currency: () => {
      return currentMoney.currency;
    },
    updateAmount: (amount) => {
      currentMoney = createMoney(amount, CurrencyEnum.BRL);
    },
  };
};

export { Price, createPrice };
