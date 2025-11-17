"use client";

import dynamic from "next/dynamic";

const TradingViewWidget = dynamic(
  () => import("@/components/TradingViewWidget"),
  { ssr: false }
);

interface Props {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

export default function TradingViewWrapper(props: Props) {
  return <TradingViewWidget {...props} />;
}
