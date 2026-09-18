const MESES_ABREVIADOS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

type FormatDate = (data: string) => string;

export const formatarDataAbreviada: FormatDate = (data) => {
  const date = new Date(data);
  const dia = String(date.getUTCDate()).padStart(2, "0");
  const mes = MESES_ABREVIADOS[date.getUTCMonth()];
  return `${dia} ${mes}`;
};
