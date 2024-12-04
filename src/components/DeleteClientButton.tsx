"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import supabase from '@/database/supabase'
import { toast } from '@/hooks/use-toast'
import { ClientRecord } from '@/types'
import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import LoadingAnimation from '@/components/LoadingAnimation'
import { div } from 'framer-motion/client'

function DeleteClientButton({client, className = ''}: {client: ClientRecord, className?: string}) {

    const [loading, setLoading] = React.useState(false);
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true);
        const { error } = await supabase.from("customer").delete().eq("id", client.id);
        setLoading(false);
        if (error) {
            console.log(error);
            toast({
                title: "Failed to delete client",
                description: error.message,
            })
        } else {
            toast({
                title: "Client deleted successfully",
                description: `${client.name} has been deleted successfully`,
            })
            router.replace("/admin/clients")
        }
    }

  return (
    <div className={className}>
        <Dialog>
          <DialogTrigger asChild className="bg-red-700 flex gap-2 items-center text-white">
            <Button variant={"destructive"} className="flex gap-2 items-center text-white" ><Trash2Icon size={16} /> Delete Client</Button>
          </DialogTrigger>
          <DialogContent className="text-left">
            <DialogHeader>
              <DialogTitle className="text-left">Are you absolutely sure?</DialogTitle>
              <DialogDescription className="text-left">
                This action cannot be undone. Are you sure you want to
                permanently delete this client: <span className="text-amber-900 font-bold">{client.name}</span>? 
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" onClick={handleDelete} disabled={loading} className='bg-red-900 hover:bg-red-800'>{ loading ? <LoadingAnimation size={24}/> : "Confirm"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default DeleteClientButton