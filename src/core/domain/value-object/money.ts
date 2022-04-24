enum CurrencyEnum {
  BRL = 'brl',
}

type MoneyType = Readonly<{
  amount: number;
  currency: CurrencyEnum;
}>;

interface Money {
	readonly amount: number
	readonly currency: CurrencyEnum
}

const createMoney = (amount: number, currency: CurrencyEnum): Money =>
  Object.freeze({
    amount,
    currency,
  });

export { MoneyType, Money, CurrencyEnum, createMoney };
