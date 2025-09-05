'use client';

import { useRefundData } from '@/lib/useRefundData';

export function RefundMetrics() {
  const { data, loading, error } = useRefundData();

  // Handle feature flag - if explicitly disabled, don't show widget
  if (data?.showWidget === false) {
    return null;
  }

  // If there's an error or no data, don't show widget at all (preserving original behavior)
  if (error || (!loading && !data)) {
    return null;
  }

  // Prepare metrics for display
  const metrics = data
    ? {
        mev: Math.round(data.totalMevRefund),
        gas: Math.round(data.totalGasRefund),
      }
    : null;

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
