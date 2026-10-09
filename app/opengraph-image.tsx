import { ogSize, renderOg } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}, software engineer`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: siteConfig.name,
    subtitle: "Software engineer. Bookings, payments, background jobs and the databases behind them.",
  });
}
