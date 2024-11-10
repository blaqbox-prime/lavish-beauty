import React from "react";
import EditServiceForm from "../../_components/EditServiceForm";
import supabase from "@/database/supabase";
import { NextResponse } from "next/server";
import * as motion from "framer-motion/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteServiceButton from "../../_components/DeleteServiceButton";

async function ServicePage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ message: error.message });
  }

  if (data.length == 0) {
    return NextResponse.json({ message: "Service not found" });
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.5 },
      }}
    >
      <div className="flex items-center justify-between">
        <motion.h1
          className="font-bold text-2xl mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          Edit Service:{" "}
          <span className="text-amber-900">{data[0].service_name}</span>
        </motion.h1>

        <DeleteServiceButton service={data[0]} />
      </div>
      <EditServiceForm service={data[0]} />
    </motion.main>
  );
}

export default ServicePage;
