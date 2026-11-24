import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
export const metadata: Metadata = { title: "FitTrack — Трекер тренировок", description: "Планирование и учёт тренировок" };
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ru"><body><div className="shell"><Sidebar/><main className="main">{children}</main></div></body></html>;
}