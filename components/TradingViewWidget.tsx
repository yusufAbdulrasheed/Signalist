"use client";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import React, { memo } from "react";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
        {title && <h2 className="mb-4 text-2xl font-semibold text-gray-100">{title}</h2>}
      <div
        ref={containerRef}
        className={`tradingview-widget-container ${className || ""}`}>
        <div className="tradingview-widget-container__widget" style={{width: "100%", height}}/>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
