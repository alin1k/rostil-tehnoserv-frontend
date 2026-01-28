"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Ellipsis,
  BookOpenText,
  SquarePen,
  Trash
} from 'lucide-react';
import { useContext } from "react";
import { ClientiContext } from "@/lib/context/clienti";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function Clienti() {

  const {client, handleAdaugare, removeClient, nume, setNume, telefon, setTelefon, email, setEmail, handleClient, handleTelefon, handleEmail, numeError, setNumeError, telefonError, setTelefonError, emailError, setEmailError} = useContext(ClientiContext);

  return (
    <>
      <h1 className="font-bold text-xl mb-5">Gestionare clienți</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-5">Adaugă client</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adăugare client</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div >
              <Label htmlFor="numeclient">Nume client</Label>
              <Input id="numeclient"
                placeholder="Popescu Ion"
                value={nume}
                onChange={handleClient}
                maxLength={50}
                required 
                className={`${numeError ? 'border-red-500' : 'border-gray-500'}`}  
              />
            </div>
            <div>
              <Label htmlFor="telefonclient">Număr de telefon client</Label>
              <Input id="telefonclient"
                placeholder="07xx xxx xxx"
                value={telefon}
                onChange={handleTelefon}
                maxLength={50}
                type="number"
                required 
                className={`${emailError ? 'border-red-500' : 'border-gray-500'}`} 
              />
            </div>
            <div>
              <Label htmlFor="emailclient">Adresă de email client</Label>
              <Input id="emailclient"
                placeholder="client@email.com"
                value={email}
                onChange={handleEmail}
                maxLength={50}
                type="email"
                required 
                className={`${telefonError ? 'border-red-500' : 'border-gray-500'}`} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => handleAdaugare(nume, telefon, email, setNume, setTelefon, setEmail, setNumeError, setTelefonError, setEmailError)}
              type="submit"
            >
              Adăugare
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        {client.length === 0 ? (
          <p className="text-center text-lg">Nu există clienți adăugați.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] text-center">Nume client</TableHead>
                <TableHead className="text-center">Telefon client</TableHead>
                <TableHead className="text-center">Email client</TableHead>
                <TableHead className="text-right w-[70px]">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {client.map((client, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{client.cNume}</TableCell>
                  <TableCell className="text-center">{client.cTelefon}</TableCell>
                  <TableCell className="text-center">{client.cEmail}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis className="hover:bg-border rounded-full" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <BookOpenText />
                          <span>Detalii</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <SquarePen />
                          <span>Editare</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash />
                          <span
                            className="hover:cursor-pointer"
                            onClick={() => removeClient(client.id)}
                          >
                            Șterge
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

    </>
  );
}
export default Clienti;
