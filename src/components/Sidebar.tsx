"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, LayoutDashboard, Dumbbell, ClipboardList, CalendarDays, TrendingUp } from "lucide-react";
const items = [
  { href: "/", label: "Обзор", icon: LayoutDashboard },
  { href: "/workouts", label: "Тренировки", icon: Activity },
  { href: "/exercises", label: "Упражнения", icon: Dumbbell },
  { href: "/plans", label: "Планы", icon: CalendarDays },
  { href: "/progress", label: "Прогресс", icon: TrendingUp }
];
export default function Sidebar() {
  const path = usePathname();
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark"><Activity size={20}/></span><span>FIT<span style={{color:"#b7f36b"}}>TRACK</span></span></div>
    <nav>{items.map(({href,label,icon:Icon})=><Link key={href} href={href} className={`nav-link ${path===href?"active":""}`}><Icon size={18}/>{label}</Link>)}</nav>
    <div className="footer-note" style={{position:"absolute",bottom:24,left:28}}>УП.01 · Учебный проект<br/>Трекер тренировок</div>
  </aside>;
}