import { createMoney, CurrencyEnum, Money } from '@core/domain/value-object/money';

interface Price {
	amount(): number
  updateAmount(amount: number, currency?: CurrencyEnum): void;
}

const createPrice = (money: Money): Price => {
  let currentMoney = money;
  return {
    amount: () => {
      return money.amount
    },
    updateAmount: (amount) => {
      currentMoney = createMoney(amount, CurrencyEnum.BRL);
    }
  }
}

export { Price, createPrice };
