import { ClientRecord } from "@/types";
import React from "react";
import * as motion from "framer-motion/client";
import { format } from "@formkit/tempo";
import StatusBadge from "./StatusBadge";

type TClientCard = {
  client: ClientRecord;
};

export default function ClientCard({ client }: TClientCard) {
  return (
    <motion.article
      id={client.id.toString()}
      className="p-5 flex items-start justify-between bg-amber-100 rounded-md relative overflow-hidden opacity-0 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-200"
      animate={{ opacity: 1 }}
    >
      <div className="left">
        <h1 className="font-bold text-amber-950">{client.name}</h1>
        <h2 className="text-sm">{client.email}</h2>
        <h2 className="text-sm">{client.phone}</h2>
      </div>

        <p className="absolute -bottom-4 right-1 opacity-5 font-black text-6xl">{client.id}</p>

    </motion.article>
  );
}
