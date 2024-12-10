"use client"

import { useClient, useClientInputs } from "@/lib/hooks/clienti";
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
function Clienti() {
  
  const {client, handleAdaugare, removeClient} = useClient();
  const {
    nume, setNume,
    telefon, setTelefon,
    email, setEmail,
    handleClient,
    handleTelefon,
    handleEmail
  } = useClientInputs()

  return (
    <>
      <div className="flex justify-center items-center mb-9  ">
        <div className="border-2 border-black p-4 w-[450px] mt-4 p-4 shadow-2xl ">

          <p className="text-center text-4xl mt-2"> Adăugare Client </p>

          <div className="px-5 py-8 flex flex-col w-[320px]">
            <p>Nume client: </p>
            <input placeholder="Adăugați numele clientului" value={nume} onChange={handleClient} maxLength={50} className=" mt-2 mb-8 border-b border-gray-500 focus:outline-none  "></input>
            <p>Telefon client:</p>
            <input placeholder="Adăugați telefonul clientului" value={telefon} onChange={handleTelefon} maxLength={50} className=" mt-2 mb-8 border-b border-gray-500 focus:outline-none" ></input>

            <p>Email client:</p>
            <input placeholder="Adăugați email-ul clientului" value={email} onChange={handleEmail} maxLength={50} className=" mt-2 border-b border-gray-500 focus:outline-none" ></input>
          </div>

          <button onClick={()=>handleAdaugare(nume, telefon, email, setNume, setTelefon, setEmail)} className="w-full bg-black py-2 rounded-2xl text-white transform transition-all duration-2gi00 active:scale-95 ease-out">Adăugare în listă</button>
        </div>
      </div>

      <div>

        <ul>
          {client.length === 0 ? (
            <p className="text-center text-lg">Tabelul nu are informații introduse.</p>
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
                              onClick={() => removeClient(index)}
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

        </ul>

      </div>

    </>
  );
}
export default Clienti;
