enum CurrencyEnum {
  BRL = 'brl',
}

type MoneyDTO = Readonly<{
  amount: number;
  currency: CurrencyEnum;
}>;

interface Money {
  readonly amount: number;
  readonly currency: CurrencyEnum;
}

const createMoney = (amount: number, currency?: CurrencyEnum): Money =>
  Object.freeze({
    amount,
    currency: currency || CurrencyEnum.BRL,
  });

export { MoneyDTO as MoneyType, Money, CurrencyEnum, createMoney };
