"use client";

import { useEffect } from "react";

type Props = {
  slot: string; // Ad unit slot id from AdSense
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
};

export default function AdUnit({
  slot,
  format = "auto",
  style,
  className,
}: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore in dev / blocked environments
    }
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // If env var missing, hide ad unit (dev safe)
  if (!client) return null;

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}