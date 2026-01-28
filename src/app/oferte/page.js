"use client"

import { useContext, useState } from 'react'
import { ClientiContext } from '@/lib/context/clienti'
import { cn } from "@/lib/utils"

import {
  User,
  Calendar,
  Trash,
  Check, 
  ChevronsUpDown, 
} from 'lucide-react';
import { OferteContext } from '@/lib/context/oferte'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading document...</p>,
  }
);
import OfferReport from '@/components/OfferReport';

export default function Oferte() {
 
  const {client: clienti} = useContext(ClientiContext);

  const {oferta: oferte,
    handleAdaugareOferta,
    removeOferta,
    numeOferta, setNumeOferta,
    numeClient,
    handleNumeClient,
    handleNumeOferta,} = useContext(OferteContext);

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <>
      <h1 className='font-bold text-xl mb-5'>Gestionare Oferte</h1>

      <div className='grid grid-cols-4 gap-2'>
        <Card>
          <CardHeader>
            <CardTitle>Adăugare ofertă</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div >
                <Label htmlFor="numeOferta">Nume ofertă</Label>
                <Input id="numeOferta"
                  placeholder="Ex: Ofertă pentru Ion"
                  value={numeOferta}
                  onChange={handleNumeOferta}
                  maxLength={50}
                  required />
              </div>
              <div>
                {clienti.length? 
                  <Popover open={open} onOpenChange={setOpen} id="numeClient">
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? clienti.find((client) => client.cNume === value)?.cNume
                          : "Alege client..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Caută client..." />
                        <CommandList>
                          <CommandEmpty>Nici un client găsit</CommandEmpty>
                          <CommandGroup>
                            {clienti.map((client, index) => (
                              <CommandItem
                                key={"client" + index}
                                value={client.cNume}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue)
                                  setOpen(false)
                                }}
                              >
                                {client.cNume}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === client.cNume ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                :
                  <>
                    <Input disabled placeholder="Nu este nici un client adăugat"/>
                    <Link href="/clienti">
                      <Button className="mt-2">
                        Adaugă un client
                      </Button>
                    </Link>
                  </>
                }
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
                className="w-full"
                onClick={() => handleAdaugareOferta(numeOferta, setNumeOferta, value)}
                type="submit"
            >
              Adăugare
            </Button>
          </CardFooter>
        </Card>
        {oferte.map((oferta, index)=>
          <Card key={index} className='relative'>
            <CardHeader>
              <CardTitle className="text-xl">{oferta.nume}</CardTitle>
              <CardDescription className="flex items-center -ms-1"><User className='scale-75'/> {oferta.numeClient}</CardDescription>
              <CardDescription className="flex items-center -ms-1"><Calendar className='scale-75'/> Ultima modificare: {oferta.data_modificare}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Produse: <span className='font-bold'>{oferta.produse.length}</span></p>
              <p>Pret total: <span className='font-bold text-lg'>{oferta.total} RON</span></p>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Link href={`/oferte/${oferta.uuid}`}>
                <Button variant="secondary" className="w-full">Edit</Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Export</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Exportare ofertă în format PDF</DialogTitle>
                  </DialogHeader>
                  <PDFDownloadLink document={<OfferReport oferta={oferta}/>} fileName={`${oferta.nume} - ${oferta.data_modificare}.pdf`}>
                    {({ blob, url, loading, error }) =>
                      loading ? 'Loading document...' : <Button>Download PDF</Button>
                    }
                  </PDFDownloadLink>
                  {/* <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">
                        Anulează
                      </Button>
                    </DialogClose>
                  </DialogFooter> */}
                </DialogContent>
              </Dialog>
              
            </CardFooter>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-0 right-0"
                >
                  <Trash className='stroke-gray-400'/>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Esti sigur ca vrei sa stergi oferta?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Aceasta actiune nu este reversibila iar oferta va fi stearsa permanent
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anulare</AlertDialogCancel>
                  <AlertDialogAction onClick={()=> removeOferta(oferta.uuid)}>Sterge Oferta</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
          </Card>
        )}
      </div>
    </>
  )
}



