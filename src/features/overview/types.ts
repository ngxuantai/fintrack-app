export type AnalyticsPeriod = 'week' | 'month' | 'year';

export type CategorySlice = {
  key: string;
  name: string;
  color: string;
  amount: number;
  /** 0–100, rounded. */
  percent: number;
};

export type CashflowBar = {
  label: string;
  /** Millions of VND. */
  income: number;
  expense: number;
  current: boolean;
};
