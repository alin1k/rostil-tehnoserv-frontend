'use client';

import { useContext, useEffect, useState } from 'react'
import { OferteContext } from '@/lib/context/oferte'
import { fetchProducts } from '@/lib/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import Link from 'next/link';
import { DialogClose } from '@radix-ui/react-dialog';
import { Checkbox } from './ui/checkbox';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditOferta({id}) {

  const router = useRouter();

  const {oferta: oferte, editOferta} = useContext(OferteContext);
  const [oferta] = oferte.filter(oferta => oferta.uuid === id)
  const [produse, setProduse] = useState(oferta?.produse || []);
  const [total, setTotal] = useState(0);
  const [nume, setNume] = useState(oferta?.nume);
  const [allProducts, setAllProducts] = useState([]);

  const [checkedStates, setCheckedStates] = useState({});

  useEffect(()=>{
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  useEffect(()=>{
    setTotal(0);
    produse?.forEach(produs => {
      setTotal(prev => prev + produs.buc * produs.price)
    });
  }, [produse]);

  const handleCheckboxChange = (productCode) => {
    setCheckedStates(prevStates => ({
      ...prevStates,
      [productCode]: !prevStates[productCode]
    }));
  };

  const handleAddButtonClick = () => {
    const checkedCodes = Object.keys(checkedStates).filter(code => checkedStates[code]);
    setCheckedStates({});

    const updatedProduse = produse.map(produs => {
      if (checkedCodes.includes(produs.code)) {
        return {
          ...produs,
          buc: parseInt(produs.buc) + 1,
        };
      }
      return produs;
    });

    const newProducts = allProducts
      .filter(product => checkedCodes.includes(product.code) && !produse.some(produs => produs.code === product.code))
      .map(product => ({ ...product, buc: 1 }));

    if (newProducts.length > 0) {
      setProduse([...updatedProduse, ...newProducts]);
    } else {
      setProduse(updatedProduse);
    }
  };

  const removeProduct = (productCode)=>{
    setProduse(prevProduse=> prevProduse.filter(produs => produs.code !== productCode));
  }

  return (
    <div>

      <Link href="/oferte" className='text-gray-400 hover:text-gray-500'>← Înapoi</Link>

      <input value={nume} onChange={(e)=> setNume(e.target.value)} className="block text-2xl mt-4 font-bold w-full focus:outline-none"/>
      <p>Beneficiar: {oferta?.numeClient}</p>
      <p>Ultima modificare: {oferta?.data_modificare}</p>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-2'>Produse</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Imagine</TableHead>
              <TableHead className="">Denumire produs</TableHead>
              <TableHead>Descriere</TableHead>
              <TableHead className="w-[70px] text-center">Buc</TableHead>
              <TableHead className="text-right">Preț</TableHead>
              <TableHead className="text-center">Ștergere</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produse?.map((product)=>
              <TableRow key={product.code}>
                <TableCell><Image src={product.img_src} width={100} height={50} className='w-100' alt={`imagine ${product.name}`}/></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-center">
                  <Input type="number" value={product.buc} onChange={(e)=>{
                    setProduse(prevProduse => prevProduse.map(prevProdus => prevProdus.code === product.code? {...prevProdus, buc: e.target.value} : prevProdus))
                  }}/>
                </TableCell>
                <TableCell className="text-right">{product.price.toFixed(2)} RON</TableCell>
                <TableCell className="text-center">
                  <Button size="icon" variant="outline" onClick={()=> {removeProduct(product.code)}}>
                    <Trash/>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4">Adaugă produse</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Adăugare Produs</DialogTitle>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Imagine</TableHead>
                    <TableHead>Descriere</TableHead>
                    <TableHead className="w-[70px] text-right">Pret</TableHead>
                    <TableHead>Selectează</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts.map((product)=>
                    <TableRow key={product.code}>
                      <TableCell><Image src={product.img_src} width={100} height={50} className='w-100' alt={`imagine ${product.name}`}/></TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-center"><Checkbox id={product.code} checked={checkedStates[product.code]} onCheckedChange={()=> handleCheckboxChange(product.code)}/></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" onClick={()=>setCheckedStates({})}>Anulează</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={()=> {handleAddButtonClick()}}>Adaugă</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <h2 className='text-xl font-bold text-right'>Total: {total.toFixed(2)} RON</h2>

      </div>

      <div className='mt-8 flex gap-4'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">
              Anulează
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ești sigur că renunți la modificări?</AlertDialogTitle>
              <AlertDialogDescription>
                Aceasta actiune nu este reversibila iar modificările nu vor fi salvate.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Anulare</AlertDialogCancel>
              <AlertDialogAction onClick={()=> router.replace("/oferte")}>Renunță la modificări</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Button onClick={()=>{
          editOferta({...oferta, nume: nume, produse: produse, data_modificare: new Date().toLocaleDateString(), total: total})
          router.replace("/oferte")
        }}>
          Salvează
        </Button>
      </div>
    </div>
  )
}