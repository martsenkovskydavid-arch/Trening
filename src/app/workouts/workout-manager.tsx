 "use client";
import { useState } from "react";
import WorkoutForm from "@/components/WorkoutForm";
type W={id:number;title:string;date:string;duration:number;notes:string|null;completed:boolean};
export default function WorkoutManager({initial}:{initial:W[]}) {
 const [items,setItems]=useState(initial); const [show,setShow]=useState(false); const [error,setError]=useState("");
 async function refresh(){const r=await fetch("/api/workouts");if(r.ok)setItems(await r.json());setShow(false);}
 async function toggle(w:W){const r=await fetch(`/api/workouts/${w.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({completed:!w.completed})});if(r.ok)setItems(items.map(x=>x.id===w.id?{...x,completed:!x.completed}:x));}
 async function remove(id:number){if(!confirm("Удалить тренировку?"))return;const r=await fetch(`/api/workouts/${id}`,{method:"DELETE"});if(r.ok)setItems(items.filter(x=>x.id!==id));else setError("Не удалось удалить запись");}
 return <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><div className="muted" style={{fontSize:13}}>Записей: {items.length}</div><button className="btn" onClick={()=>setShow(!show)}>{show?"Закрыть":"＋ Новая тренировка"}</button></div>
 {show&&<div className="card" style={{marginBottom:18,maxWidth:650}}><h2 className="section-title">Добавление тренировки</h2><WorkoutForm onDone={refresh}/></div>}
 {error&&<div className="notice">{error}</div>}
 <div className="card">{items.length===0?<div className="empty">Тренировок пока нет. Создай первую запись.</div>:<div className="table-wrap"><table className="table"><thead><tr><th>Тренировка</th><th>Дата</th><th>Длительность</th><th>Статус</th><th>Действия</th></tr></thead><tbody>{items.map(w=><tr key={w.id}><td><b>{w.title}</b>{w.notes&&<div className="muted" style={{fontSize:11,marginTop:4}}>{w.notes}</div>}</td><td>{new Date(w.date).toLocaleDateString("ru-RU")}</td><td>{w.duration} мин.</td><td><span className={`pill ${w.completed?"":"gray"}`}>{w.completed?"Завершена":"Запланирована"}</span></td><td><div className="row-actions"><button className="small-btn" onClick={()=>toggle(w)}>{w.completed?"Вернуть":"Завершить"}</button><button className="small-btn" onClick={()=>remove(w.id)}>Удалить</button></div></td></tr>)}</tbody></table></div>}</div></>;
}