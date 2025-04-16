"use client";

import AppProviders from "./providers";

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <AppProviders>{children}</AppProviders>;
}
