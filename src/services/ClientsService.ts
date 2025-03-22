import { TablesUpdate } from "@/database/database"
import supabase from "@/database/supabase"
import { ClientRecord } from "@/types"

export default class ClientService {


    // Delete a client by ID
    async deleteClient(id: string | number){
        const {error} = await supabase.
        from('customer').
        delete().
        eq('id', id)

        if(error){
            console.log(error)
            return false
        }
        return true
    }

    // Get All Clients
    async getAllClients(){
        const { data, error } = await supabase.from('customer').select('*')

        if(error){
            console.log(error)
            return null
        }
        return data
    }

    // Update A Client
    async updateClient(client: any){
        const { error } = await supabase.from('customer').update(client).eq('id', client.id)

        if(error){
            console.log(error)
            return false
        }
        return true
    }

    // Get A Client By ID
    async getClientById(id: string | number){
        const { data, error } = await supabase.from('customer').select('*').eq('id', id).single()

        if(error){
            console.log(error)
            return null
        }
        return data
    }

}


