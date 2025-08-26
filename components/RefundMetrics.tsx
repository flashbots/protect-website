'use client';

import { useEffect, useState } from 'react';

import { config } from '@/lib/config';

interface MetricsData {
  totalMevRefund: number;
  totalGasRefund: number;
  showWidget?: boolean;
}

export function RefundMetrics() {
  const [metrics, setMetrics] = useState<{ mev: number; gas: number } | null>(
    null,
  );
  const [showWidget, setShowWidget] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch(`${config.refundMetricsApiUrl}/api/metrics`);
        if (res.ok) {
          const data: MetricsData = await res.json();

          // Check feature flag
          if (data.showWidget === false) {
            setShowWidget(false);
            setLoading(false);
            return;
          }

          setMetrics({
            mev: Math.round(data.totalMevRefund),
            gas: Math.round(data.totalGasRefund),
          });
        }
      } catch {
        // On error, don't show widget at all
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  // Don't render if feature flag is false
  if (!showWidget) {
    return null;
  }

  // Loading state - show placeholder
  if (loading) {
    return (
      <div className="bg-white border border-black border-opacity-10 rounded-[60px] inline-flex items-center gap-2 sm:gap-4 h-[35px] sm:h-[41px] px-3 sm:px-[19px] text-black">
        <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] opacity-40">
          Refunds
        </span>
        <div className="w-[1px] bg-black bg-opacity-30 h-[16px]" />
        <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] opacity-40">
          MEV ... ETH
        </span>
        <div className="w-[1px] bg-black bg-opacity-30 h-[16px]" />
        <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] opacity-40">
          Gas ... ETH
        </span>
      </div>
    );
  }

  // If loading is done but no metrics, don't show widget (error case)
  if (!metrics) {
    return null;
  }

  return (
    <div className="bg-white border border-black border-opacity-10 rounded-[60px] inline-flex items-center gap-2 sm:gap-4 h-[35px] sm:h-[41px] px-3 sm:px-[19px] text-black">
      <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] opacity-40">
        Refunds
      </span>
      <div className="w-[1px] bg-black bg-opacity-30 h-[16px]" />
      <a
        href="https://dune.com/flashbots/flashbots-protect"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] opacity-100 hover:opacity-80 transition-all duration-200 cursor-pointer"
      >
        MEV {metrics.mev} ETH
      </a>
      <div className="w-[1px] bg-black bg-opacity-30 h-[16px]" />
      <a
        href="https://dune.com/flashbots/buildernet"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] opacity-100 hover:opacity-80 transition-all duration-200 cursor-pointer"
      >
        Gas {metrics.gas} ETH
      </a>
    </div>
  );
}
