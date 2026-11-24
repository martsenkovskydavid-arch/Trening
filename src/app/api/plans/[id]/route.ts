import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function DELETE(_:Request,{params}:{params:{id:string}}){try{await prisma.trainingPlan.delete({where:{id:Number(params.id)}});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Не найдено"},{status:404});}}