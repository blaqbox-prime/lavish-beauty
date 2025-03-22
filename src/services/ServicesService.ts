import { TablesInsert, TablesUpdate } from "@/database/database"
import supabase from "@/database/supabase"
import { ServiceRecord } from "@/types"

export default class ServicesService {
    async getAllServices() : Promise<ServiceRecord[] | null> {
        const { data, error } = await supabase.from('services').select('*')

        if(error){
            console.log(error)
            return null
        }
        return data
    }

    async getServicesByCategory(category: string) : Promise<ServiceRecord[] | null> {
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

    async getServiceById(id: string) : Promise<ServiceRecord | null> {
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

    async getServicesByBookingId(id: string) {
        const { data, error } = await supabase
            .from('booked_service')
            .select(`*, services(
        service_name,
        category,
        price,
        duration)`)
            .eq('booking_id', id)

        if(error){
            console.log(error)
            return null
        }

        return data
    }

    async createService(service: TablesInsert<'services'>) :Promise<ServiceRecord | null> {
        const { data, error } = await supabase
            .from('services')
            .insert(service)

        if(error){
            console.log(error)
            return null
        }

        return data
    }

    async updateService(service: TablesUpdate<'services'>) : Promise<ServiceRecord | null> {
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

    async getMostBookedService() {
        const { data, error } = await supabase.rpc('get_most_booked_service');

        if (error) {
            console.error('Error fetching most booked service:', error);
            return null;
        } else {
            console.log('Most Booked Service:', data);
            return data;
        }
    }

    async getTop5Services(){
        const { data, error } = await supabase.rpc('get_top_5_requested_services');

        if (error) {
            console.error('Error fetching top 5 requested services:', error);
            return null;
        } else {
            console.log('Top 5 Requested Services:', data);
            return data;
        }
    }
}