import { prisma } from "@/lib/prisma";
import ExerciseManager from "@/components/ExerciseManager";
export const dynamic="force-dynamic";
export default async function Exercises(){const data=await prisma.exercise.findMany({orderBy:{name:"asc"}});return <><div className="page-head"><div><div className="eyebrow">БИБЛИОТЕКА</div><h1>Упражнения</h1><div className="sub">Справочник упражнений и групп мышц.</div></div></div><ExerciseManager initial={data}/></>}
