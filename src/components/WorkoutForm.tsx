 "use client";
import { useState } from "react";
export default function WorkoutForm({ onDone }: { onDone:()=>void }) {
 const [title,setTitle]=useState(""); const [date,setDate]=useState(new Date().toISOString().slice(0,10));
 const [duration,setDuration]=useState("60"); const [notes,setNotes]=useState("");
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");
  const r=await fetch("/api/workouts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title,date,duration:Number(duration),notes})});
  setBusy(false); if(r.ok){onDone();setTitle("");setNotes("");}else setError("Не удалось сохранить запись. Проверьте заполнение полей.");
 }
 return <form onSubmit={submit}>
  {error&&<div className="notice" style={{background:"#40272b",color:"#ffb0b8"}}>{error}</div>}
  <div className="field"><label>Название тренировки</label><input required minLength={2} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Например, Грудь и трицепс"/></div>
  <div className="form-row"><div className="field"><label>Дата</label><input type="date" required value={date} onChange={e=>setDate(e.target.value)}/></div><div className="field"><label>Длительность, мин.</label><input type="number" min="1" max="600" value={duration} onChange={e=>setDuration(e.target.value)}/></div></div>
  <div className="field"><label>Заметки</label><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Самочувствие, результаты, комментарии..."/></div>
  <button className="btn" disabled={busy}>{busy?"Сохранение...":"Сохранить тренировку"}</button>
 </form>;
}