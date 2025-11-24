import { NextRequest, NextResponse } from "next/server";
import ClientService from "@/services/ClientsService";
import { URLSearchParams } from "url";


export async function GET(request: NextRequest){

  const service = new ClientService()

 const data = await service.getAllClients()
 console.info(data)

  return NextResponse.json(data)

}

export async function DELETE(request: NextRequest){

  const params = new URLSearchParams(request.url)
  const id = params.get("id")

  const service = new ClientService()

 const data = await service.deleteClient(id as string)
 console.info(data)

  return NextResponse.json(data)

}

