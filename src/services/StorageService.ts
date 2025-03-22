import supabase from "@/database/supabase";


export default class StorageService {

//     Upload an image
    uploadImage(image: any):string {
        return "";
    }

    async getGalleryImages(): Promise<string[]> {
        const { data, error } = await supabase
            .storage
            .from('pictures')
            .list('gallery', {
                limit: 50,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            })

        if (error) {
            console.error(error)
            throw new Error("Failed to fetch gallery images")
        }

        const SUPABASE_BUCKET_PATH = process.env.SUPABASE_URL as string + "/storage/v1/object/public/pictures/gallery/";

        return data?.map((item) => `${SUPABASE_BUCKET_PATH}${item.name}`);
    }
}