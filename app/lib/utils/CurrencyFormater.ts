type FormatCurrency = (value: number) => string;

export const formatarParaBRLCode: FormatCurrency = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "symbol",
  }).format(valor);
};
