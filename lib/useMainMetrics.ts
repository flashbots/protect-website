'use client';

import { useRefundData } from './useRefundData';

interface MainMetrics {
  transactionsProcessed: number;
  refundsEarned: number;
}

export function useMainMetrics() {
  const { data, loading, error } = useRefundData();

  // Process the raw API data for main page display
  const metrics: MainMetrics | null = (() => {
    if (!data || error) return null;

    // Check if we have refund data (always required)
    const hasRefundData = data.totalMevRefund > 0 || data.totalGasRefund > 0;
    if (!hasRefundData) return null;

    // For transaction count, use data if available, otherwise fallback to 0 (will show as "..." placeholder)
    const transactionCount = data.totalTransactions || 0;

    return {
      transactionsProcessed: transactionCount,
      refundsEarned: Math.round(data.totalMevRefund + data.totalGasRefund),
    };
  })();

  return { metrics, loading, error };
}
