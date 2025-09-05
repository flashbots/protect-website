'use client';

import { useEffect, useState } from 'react';

import { config } from '@/lib/config';

// Full API response shape
interface RefundApiData {
  totalMevRefund: number;
  totalGasRefund: number;
  totalTransactions: number;
  showWidget?: boolean;
  stale?: boolean;
  fetchedAt?: string;
}

// Shared API call and caching logic
export function useRefundData() {
  const [data, setData] = useState<RefundApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${config.refundMetricsApiUrl}/api/metrics`);
        if (res.ok) {
          const apiData: RefundApiData = await res.json();
          setData(apiData);
          setError(false);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
