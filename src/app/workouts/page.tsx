import { prisma } from "@/lib/prisma";
import WorkoutManager from "./workout-manager";
export const dynamic="force-dynamic";
export default async function Workouts(){const data=await prisma.workout.findMany({orderBy:{date:"desc"}});return <><div className="page-head"><div><div className="eyebrow">ЖУРНАЛ АКТИВНОСТИ</div><h1>Тренировки</h1><div className="sub">Создавай занятия и сохраняй результаты.</div></div></div><WorkoutManager initial={data.map(x=>({...x,date:x.date.toISOString()}))}/></>}
