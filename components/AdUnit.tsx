"use client";

import { useEffect } from "react";

type Props = {
  slot: string; // Your AdSense ad unit slot id (numbers)
  className?: string;
  style?: React.CSSProperties;
};

export default function AdUnit({ slot, className, style }: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers / localhost may cause this; ignore safely
    }
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}