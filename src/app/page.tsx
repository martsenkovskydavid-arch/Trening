import Link from "next/link";
import { Activity, Clock3, Dumbbell, Target, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function Home() {
 const [total,done,minutes,latest,exerciseCount] = await Promise.all([
  prisma.workout.count(), prisma.workout.count({where:{completed:true}}),
  prisma.workout.aggregate({where:{completed:true},_sum:{duration:true}}),
  prisma.workout.findMany({orderBy:{date:"desc"},take:5}),
  prisma.exercise.count()
 ]);
 const stats=[{label:"Всего тренировок",value:total,icon:Activity},{label:"Завершено",value:done,icon:Target},{label:"Минут активности",value:minutes._sum.duration??0,icon:Clock3},{label:"Упражнений в базе",value:exerciseCount,icon:Dumbbell}];
 return <><div className="page-head"><div><div className="eyebrow">ТВОЯ ФОРМА — ТВОЯ СИСТЕМА</div><h1>Обзор</h1><div className="sub">Следи за нагрузкой, фиксируй результаты и двигайся к цели.</div></div><Link className="btn" href="/workouts">+ Добавить тренировку</Link></div>
 <div className="grid-stats">{stats.map(s=><div className="card stat" key={s.label}><div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div></div><div className="stat-icon"><s.icon size={20}/></div></div>)}</div>
 <div className="content-grid"><section className="card"><h2 className="section-title">Последние тренировки</h2>{latest.length===0?<div className="empty">Пока нет записей. Добавь первую тренировку.</div>:<div className="table-wrap"><table className="table"><thead><tr><th>Название</th><th>Дата</th><th>Время</th><th>Статус</th></tr></thead><tbody>{latest.map(w=><tr key={w.id}><td><b>{w.title}</b></td><td>{w.date.toLocaleDateString("ru-RU")}</td><td>{w.duration} мин.</td><td><span className={`pill ${w.completed?"":"gray"}`}>{w.completed?"Завершена":"Запланирована"}</span></td></tr>)}</tbody></table></div>}<div style={{marginTop:18}}><Link href="/workouts" className="muted" style={{fontSize:13}}>Все тренировки <ArrowUpRight size={14} style={{display:"inline"}}/></Link></div></section>
 <section className="card"><h2 className="section-title">Начни с простого</h2><div style={{display:"grid",gap:15}}><div><b>1. Создай тренировку</b><p className="muted" style={{fontSize:13,lineHeight:1.6}}>Запиши название, дату и длительность занятия.</p></div><div><b>2. Заполни справочник</b><p className="muted" style={{fontSize:13,lineHeight:1.6}}>Добавь упражнения и укажи группы мышц.</p></div><div><b>3. Отслеживай прогресс</b><p className="muted" style={{fontSize:13,lineHeight:1.6}}>Отмечай завершённые занятия и сравнивай активность.</p></div></div></section></div>
 <div className="footer-note">Учебный проект УП.01 · FitTrack · Данные хранятся в локальной базе SQLite</div></>;
}