import prisma from "@/lib/prisma";


export default class ClientService {
    async getClientByEmail(email: string) {
        try {
            const client = await prisma.customer.findUnique({
                where: { email },
            });
            return client;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createClient(clientInfo: { created_at?: string | null; email: string; id?: never; name: string; phone: string }) {
        try {
            const client = await prisma.customer.create({
                data: clientInfo,
            });
            return client;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteClient(id: string | number) {
        try {
            await prisma.customer.delete({
                where: { id: Number(id) },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllClients() {
        try {
            const clients = await prisma.customer.findMany();
            return clients;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateClient(client: any) {
        try {
            await prisma.customer.update({
                where: { id: client.id },
                data: client,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getClientById(id: string | number) {
        try {
            const client = await prisma.customer.findUnique({
                where: { id: Number(id) },
            });
            return client;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}