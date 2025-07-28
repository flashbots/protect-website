import { config } from '@/lib/config';

interface MetricsData {
  totalMevRefund: number;
  totalGasRefund: number;
}

export async function RefundMetrics() {
  try {
    const res = await fetch(`${config.refundMetricsApiUrl}/api/metrics`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const data: MetricsData = await res.json();
    const mev = Math.round(data.totalMevRefund);
    const gas = Math.round(data.totalGasRefund);

    return (
      <a
        href={config.refundMetricsRedirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white border border-black border-opacity-10 rounded-[60px] inline-flex items-center gap-2 sm:gap-4 h-[35px] sm:h-[41px] px-3 sm:px-[19px] text-black text-opacity-40 hover:text-opacity-60 transition-opacity cursor-pointer"
      >
        <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px] mr-1">
          Refunds:
        </span>
        <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px]">
          MEV {mev} ETH
        </span>
        <div className="w-[1px] bg-black bg-opacity-30 h-[16px]" />
        <span className="text-xs sm:text-[17px] font-medium tracking-[-0.34px]">
          Gas {gas} ETH
        </span>
      </a>
    );
  } catch {
    return null;
  }
}
