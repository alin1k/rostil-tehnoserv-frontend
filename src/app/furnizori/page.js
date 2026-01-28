"use client";

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
import { FurnizoriContext } from "@/lib/context/furnizori";
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

function Furnizori() {

    const {furnizor, handleAddFurnizor, removeFurnizor, nume, setNume, email, setEmail, adresa, setAdresa, numeError, setNumeError, adresaError, setAdresaError, emailError, setEmailError} = useContext(FurnizoriContext);

    return (
        <>
            <h1 className="font-bold text-xl mb-5">Gestionare furnizori</h1>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-5">Adaugă furnizor</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adăugare furnizor</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <div>
                            <Label htmlFor="numefurnizor">Nume furnizor:</Label>
                            <Input id="numefurnizor"
                                onChange={(e) => setNume(e.target.value)}
                                placeholder="SC Corporatie SRL"
                                value={nume}
                                maxLength={50}
                                required 
                                className={`${numeError ? 'border-red-500' : 'border-gray-500'}`}
                            />
                        </div>
                        <div>
                            <Label htmlFor="adresafurnizor">Adresă furnizor:</Label>
                            <Input id="adresafurnizor"
                                onChange={(e) => setAdresa(e.target.value)}
                                placeholder="Brasov, Romania"
                                value={adresa}
                                maxLength={50}
                                required 
                                className={`${adresaError ? 'border-red-500' : 'border-gray-500'}`}
                            />
                        </div>
                        <div>
                            <Label htmlFor="websitefurnizor">Website furnizor:</Label>
                            <Input id="websitefurnizor"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="www.furnizor.ro"
                                value={email}
                                maxLength={50}
                                type="url"
                                required 
                                className={`${emailError ? 'border-red-500' : 'border-gray-500'}`}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => handleAddFurnizor(nume, adresa, email, setNume, setAdresa, setEmail, setNumeError, setAdresaError, setEmailError)}
                            type="submit"
                        >
                            Adăugare
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex justify-center items-center">
                {furnizor.length === 0 ? (
                    <p className="text-center text-lg">Nu există furnizori adăugați.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px] text-center">Nume furnizor</TableHead>
                                <TableHead className="text-center">Adresă furnizor</TableHead>
                                <TableHead className="text-center">Website furnizor</TableHead>
                                <TableHead className="text-right w-[70px]">Acțiuni</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {furnizor.map((furnizor, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{furnizor.fNume}</TableCell>
                                    <TableCell className="text-center">{furnizor.fAdresa}</TableCell>
                                    <TableCell className="text-center">{furnizor.fEmail}</TableCell>
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
                                                        onClick={() => removeFurnizor(furnizor.id)}
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

export default Furnizori;
