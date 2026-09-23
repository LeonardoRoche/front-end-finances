export type BankAccountSummary = {
  id: string;
  name: string;
  balance: number;
  subtype: string;
};

export type InvestmentAccountSummary = {
  id: string;
  name: string;
  balance: number;
  subtype: string;
};

export type CreditCardSummary = {
  id: string;
  name: string;
  brand: string | null;
  currentInvoice: number;
  creditLimit: number;
  availableLimit: number;
  utilizationPercent: number;
  dueDate: string | null;
};

export type DashboardSummary = {
  bankBalance: number;
  bankAccounts: BankAccountSummary[];
  investmentTotal: number;
  investmentAccounts: InvestmentAccountSummary[];
  monthlySalary: number;
  monthlyBalance: number;
  monthlyExpenses: number;
  monthlyPeerTransfers: number;
  monthlyCardSpending: number;
  monthlyCreditCardBillPaid: number;
  creditCards: CreditCardSummary[];
  creditCardTotalInvoice: number;
  creditCardTotalLimit: number;
  /** @deprecated use bankBalance */
  totalValue: number;
  /** @deprecated use monthlySalary */
  monthlyRevenue: number;
};

export type Transaction = {
  id: string;
  description: string;
  category: string;
  account: string;
  date: string;
  amount: number;
};

export type TransactionTypeFilter = "Saídas" | "Entradas" | "Transferências";

export type TransactionFilters = {
  search?: string;
  type?: TransactionTypeFilter;
  category?: string;
  month?: string;
  page?: number;
  pageSize?: number;
  /** @deprecated use pageSize */
  limit?: number;
};

export type PaginatedTransactions = {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type CreateTransactionInput = {
  description: string;
  category: string;
  account: string;
  date: string;
  amount: number;
};

export type UpdateTransactionInput = Partial<CreateTransactionInput>;

export type BudgetPeriod = "monthly" | "weekly";

export type BudgetAlertThreshold = 80 | 100;

export type Budget = {
  id: string;
  title: string;
  amount: number;
  totalAmount: number;
  period: BudgetPeriod;
  alertThreshold: BudgetAlertThreshold;
};

export type CreateBudgetInput = {
  category: string;
  limit: number;
  period: BudgetPeriod;
  alertThreshold: BudgetAlertThreshold;
};

export type UpdateBudgetInput = Partial<CreateBudgetInput>;

export type ConnectTokenResponse = {
  accessToken: string;
};

export type ConnectionStatus =
  | "UPDATED"
  | "LOGIN_ERROR"
  | "OUTDATED"
  | "WAITING_USER_INPUT";

export type Connection = {
  id: string;
  pluggyItemId: string;
  status: ConnectionStatus | string;
  connectorName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateConnectionInput = {
  pluggyItemId: string;
  status: string;
  connectorName: string;
};

export type SyncPluggyResult = {
  itemsSynced: number;
  connectionsCreated: number;
  connectionsUpdated: number;
  transactionsImported: number;
  transactionsUpdated: number;
  transactionsSkipped: number;
  invalidConnectionsSkipped: number;
  source: "pluggy-list" | "local-connections" | "item-ids";
};

export type RecategorizeResult = {
  processed: number;
  updated: number;
  aiEnabled: boolean;
};

export type PluggyConnectItem = {
  id: string;
  status: string;
  connector?: {
    name?: string;
  };
};
