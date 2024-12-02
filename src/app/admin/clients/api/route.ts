import { getAllClients } from "@/services/ClientsService";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest){
    const clients = await getAllClients();
    console.log(clients, "from route")
    return NextResponse.json(clients)
}