export type FilterOption = {
  value: string;
  label: string;
};

export const typeOptions: FilterOption[] = [
  { value: "Todos os tipos", label: "Todos os tipos" },
  { value: "Entradas", label: "Entradas" },
  { value: "Saídas", label: "Saídas" },
  { value: "Transferências", label: "Transferências" },
];

export const categoryOptions: FilterOption[] = [
  { value: "Todas as categorias", label: "Todas as categorias" },
  { value: "Alimentação", label: "Alimentação" },
  { value: "Transporte", label: "Transporte" },
  { value: "Lazer", label: "Lazer" },
  { value: "Saúde", label: "Saúde" },
  { value: "Assinaturas", label: "Assinaturas" },
];

export const periodOptions: FilterOption[] = [
  { value: "Este mês", label: "Este mês" },
  { value: "Mês passado", label: "Mês passado" },
  { value: "Últimos 3 meses", label: "Últimos 3 meses" },
  { value: "Este ano", label: "Este ano" },
];

// Valor negativo = saída, positivo = entrada.
export const transactions = [
  {
    id: 1,
    description: "Supermercado Extra",
    category: "Alimentação",
    account: "Cartão de crédito",
    date: "2026-09-18",
    amount: -250,
  },
  {
    id: 2,
    description: "Uber",
    category: "Transporte",
    account: "Cartão de crédito",
    date: "2026-09-12",
    amount: -32.9,
  },
  {
    id: 3,
    description: "Netflix",
    category: "Assinaturas",
    account: "Cartão de crédito",
    date: "2026-09-10",
    amount: -39,
  },
  {
    id: 4,
    description: "Farmácia",
    category: "Saúde",
    account: "Conta corrente",
    date: "2026-09-08",
    amount: -90,
  },
  {
    id: 5,
    description: "Salário",
    category: "Renda",
    account: "Conta corrente",
    date: "2026-09-05",
    amount: 5800,
  },
];
