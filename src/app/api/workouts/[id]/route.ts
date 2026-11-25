import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
type C={params:{id:string}};
export async function PATCH(req:Request,{params}:C){const id=Number(params.id);if(!Number.isInteger(id))return NextResponse.json({error:"ID"}, {status:400});const b=await req.json();try{return NextResponse.json(await prisma.workout.update({where:{id},data:{completed:Boolean(b.completed)}}));}catch{return NextResponse.json({error:"Не найдено"},{status:404});}}
export async function DELETE(_:Request,{params}:C){const id=Number(params.id);try{await prisma.workout.delete({where:{id}});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:"Не найдено"},{status:404});}}