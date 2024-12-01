import { TablesInsert, TablesUpdate } from "@/database/database"
import supabase from "@/database/supabase"
import { ServiceRecord } from "@/types"

export const getServices : () => Promise<ServiceRecord[] | null> = async () => {
    const { data, error } = await supabase.from('services').select('*')

    if(error){
        console.log(error)
        return null
    }
    return data
}

export const getServicesByCategory : (category: string) => Promise<ServiceRecord[] | null> = async (category: string) => {
    const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('category', category)

    if(error){
        console.log(error)
        return null
    }

    return data
}

export const getServiceById : (id: string) => Promise<ServiceRecord | null> = async (id: string) => {
    const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()

    if(error){
        console.log(error)
        return null
    }

    return data;
}

export const createService : (service: TablesInsert<'services'>) => Promise<ServiceRecord | null> = async (service: TablesInsert<'services'>) => {
    const { data, error } = await supabase
    .from('services')
    .insert(service)

    if(error){  
        console.log(error)
        return null
    }   

    return data
}

export const updateService : (service: TablesUpdate<'services'>) => Promise<ServiceRecord | null> = async (service: TablesUpdate<'services'>) => {
    const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', service.id || -1)

    if(error){
        console.log(error)
        return null
    }

    return data 
}