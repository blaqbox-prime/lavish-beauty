import { NextRequest, NextResponse } from "next/server";
import StorageService from "@/services/StorageService";


export async function GET(request: NextRequest){

    const service = new StorageService()

    const data = await service.getGalleryImages()

    return NextResponse.json(data)

}