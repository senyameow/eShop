type CheckNumber = number;
type CardNumber = string;
type SBP = string;

// карты, которые пока что принимает наш магазин
type Mastercard = string;
type Visa = string;

type CardType = Visa | Mastercard;

// информация о карте пользователя
type CreditCardInfo = {
    cardType: CardType;
    cardNumber: CardNumber;
};

type PaymentAmount = number;

// принимаемые валюты
type RUB = 'rub'
type USD = 'usd'
type Currency = RUB | USD;

// варианты оплаты
type PaymentMethod = SBP | CheckNumber | CreditCardInfo;

export class Payment {
    constructor(
        public readonly amount: PaymentAmount,
        public readonly currency: Currency,
        public readonly method: PaymentMethod,
    ) { }
};

