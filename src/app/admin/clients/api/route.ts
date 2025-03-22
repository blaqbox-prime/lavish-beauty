import ClientService from "@/services/ClientsService";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest){
    const clientService = new ClientService();
    const clients = await clientService.getAllClients();
    console.log(clients, "from route")
    return NextResponse.json(clients)
}