import { useEffect, useState } from "react";
import { fetchOferte, addOferta, updateOferta, deleteOferta } from "../api";

export const useOferte = ()=>{
  const [oferta , setOferta] = useState([]);

  useEffect(() =>{
    const getOferte = async () => {
      try {
        const data = await fetchOferte();
        setOferta(data);
      } catch (error) {
        console.error("Error fetching oferte:", error);
      }
    };
    getOferte();
  }, []);

  async function handleAdaugareOferta(numeOferta, setNumeOferta, numeClient)
  {
    if(numeOferta !== "" && numeClient !== ""){
      const newOferta = {
        data_modificare: new Date().toLocaleDateString(),
        total: 0,
        nume : numeOferta,
        produse: [],
        numeClient : numeClient
      };

      try {
        const addedOferta = await addOferta(newOferta);
        setOferta(o => [...o, addedOferta]);
        setNumeOferta("");
      } catch (error) {
        console.error("Error adding oferta:", error);
      }
    }
  }

  async function removeOferta(uuid){
    try {
      await deleteOferta(uuid);
      setOferta(oferta.filter((n) => n.uuid !== uuid));
    } catch (error) {
      console.error("Error deleting oferta:", error);
    }
  }

  async function editOferta(updatedOferta){
    try {
      const result = await updateOferta(updatedOferta.uuid, updatedOferta);
      setOferta(oferta.map(of => of.uuid === updatedOferta.uuid ? result : of));
    } catch (error) {
      console.error("Error updating oferta:", error);
    }
  }

  return {
    oferta, setOferta,
    handleAdaugareOferta,
    removeOferta,
    editOferta
  }
}

export const useOferteInputs = ()=>{
  const [numeOferta,setNumeOferta] = useState("");
  const [numeClient,setNumeClient] = useState("");

  function handleNumeOferta(event){
    setNumeOferta(event.target.value);
  }

  function handleNumeClient(event){
    setNumeClient(event.target.value);
  }

  return{
    numeOferta, setNumeOferta,
    numeClient, setNumeClient,
    handleNumeClient,
    handleNumeOferta,
  }
}