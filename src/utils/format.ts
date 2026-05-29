export const formatCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "en-US",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(value);
};
