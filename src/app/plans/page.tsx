import { prisma } from "@/lib/prisma";
import PlanManager from "./plan-manager";
export const dynamic="force-dynamic";
export default async function Plans(){const data=await prisma.trainingPlan.findMany({orderBy:{createdAt:"desc"}});return <><div className="page-head"><div><div className="eyebrow">СТРУКТУРА ЗАНЯТИЙ</div><h1>Планы тренировок</h1><div className="sub">Сохраняй программы и распределяй нагрузку по неделе.</div></div></div><PlanManager initial={data}/></>}
