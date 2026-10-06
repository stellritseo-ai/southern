import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingChat } from "./FloatingChat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b0f15] text-white flex flex-col">
      <Header />
      <main className="flex-grow pt-[84px] md:pt-[97px]">{children}</main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
