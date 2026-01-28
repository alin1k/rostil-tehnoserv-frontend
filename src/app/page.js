"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientiContext } from "@/lib/context/clienti";
import { FurnizoriContext } from "@/lib/context/furnizori";
import { OferteContext } from "@/lib/context/oferte";
import {
  ClipboardList,
  Package,
  Truck,
  User,
} from 'lucide-react';
import Link from "next/link";
import { useContext } from "react";

export default function Home() {

  const {oferta} = useContext(OferteContext);
  const {client} = useContext(ClientiContext);
  const {furnizor} = useContext(FurnizoriContext);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            RostilThenoserv
          </CardTitle>
          <CardDescription>
            {new Date().toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between gap-3">
            <Link href="/oferte" className="flex flex-col items-center rounded-xl p-2 hover:cursor-pointer hover:bg-accent">
              <ClipboardList/>
              <p className="text-lg font-semibold">Oferte</p>
              <span>{oferta.length}</span>
            </Link>
            <Link href="/produse" className="flex flex-col items-center rounded-xl p-2 hover:cursor-pointer hover:bg-accent">
              <Package/>
              <p className="text-lg font-semibold">Produse</p>
              <span>6</span>
            </Link>
            <Link href="/furnizori" className="flex flex-col items-center rounded-xl p-2 hover:cursor-pointer hover:bg-accent">
              <Truck/>
              <p className="text-lg font-semibold">Furnizori</p>
              <span>{furnizor.length}</span>
            </Link>
            <Link href="/clienti" className="flex flex-col items-center rounded-xl p-2 hover:cursor-pointer hover:bg-accent">
              <User/>
              <p className="text-lg font-semibold">Clienti</p>
              <span>{client.length}</span>
            </Link>
          </div> 
        </CardContent>
      </Card>
    </div>
  );
}
