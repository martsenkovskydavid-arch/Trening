 "use client";
import { useState } from "react";
type Ex={id:number;name:string;muscleGroup:string;description:string|null};
export default function ExerciseManager({initial}:{initial:Ex[]}) {
 const [items,setItems]=useState(initial); const [name,setName]=useState(""); const [group,setGroup]=useState("Грудь"); const [description,setDescription]=useState("");
 const [error,setError]=useState("");
 async function add(e:React.FormEvent){e.preventDefault();setError("");const r=await fetch("/api/exercises",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,muscleGroup:group,description})});if(!r.ok){setError("Не удалось добавить упражнение");return;}const x=await r.json();setItems([x,...items]);setName("");setDescription("");}
 async function remove(id:number){if(!confirm("Удалить упражнение?"))return;const r=await fetch(`/api/exercises/${id}`,{method:"DELETE"});if(r.ok)setItems(items.filter(x=>x.id!==id));else setError("Нельзя удалить упражнение, которое уже используется в тренировке.");}
 return <div className="content-grid">
  <div className="card"><h2 className="section-title">Справочник упражнений</h2>{items.length===0?<div className="empty">Пока нет упражнений</div>:items.map(x=><div key={x.id} style={{display:"flex",justifyContent:"space-between",gap:12,padding:"13px 0",borderTop:"1px solid #2a3140"}}><div><b>{x.name}</b><div className="muted" style={{fontSize:12,marginTop:5}}>{x.muscleGroup}{x.description?` · ${x.description}`:""}</div></div><button className="small-btn" onClick={()=>remove(x.id)}>Удалить</button></div>)}</div>
  <div className="card"><h2 className="section-title">Новое упражнение</h2>{error&&<div className="notice">{error}</div>}<form onSubmit={add}>
   <div className="field"><label>Название</label><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Например, Жим лёжа"/></div>
   <div className="field"><label>Группа мышц</label><select value={group} onChange={e=>setGroup(e.target.value)}>{["Грудь","Спина","Ноги","Плечи","Руки","Пресс","Кардио","Другое"].map(g=><option key={g}>{g}</option>)}</select></div>
   <div className="field"><label>Описание</label><textarea value={description} onChange={e=>setDescription(e.target.value)}/></div><button className="btn">Добавить упражнение</button>
  </form></div>
 </div>;
}