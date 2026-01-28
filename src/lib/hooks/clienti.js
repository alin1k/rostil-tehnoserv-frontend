import { useState, useEffect } from "react";
import { fetchClients, addClient, deleteClient } from "../api";

export const useClient = ()=>{
  const [client, setClient] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClients();
        setClient(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    getClients();
  }, []);

  async function handleAdaugare(nume, telefon, email, setNume, setTelefon, setEmail,setNumeError,setEmailError,setTelefonError) {
    
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

  
    setNumeError("");
    setTelefonError("");
    setEmailError("");

  
    if (nume === "") {
      setNumeError("Numele este obligatoriu.");
      isValid = false;
    }

    if (telefon === "" ) {
      setTelefonError("Telefonul este invalid");
      isValid = false;
    }

 
    if (!regex.test(email) || email ==="") {
      setEmailError("Emailul este invalid.");
      isValid = false;
    }

    if (isValid) {
      const newClient = {
        cNume: nume,
        cEmail: email,
        cTelefon: telefon
      };

      try {
        const addedClient = await addClient(newClient);
        setClient(c => [...c, addedClient]);
        setNume("");
        setTelefon("");
        setEmail("");
      } catch (error) {
        console.error("Error adding client:", error);
      }
    }

  
  };

  async function removeClient(id) {
    try {
      await deleteClient(id);
      setClient(client.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }

  return {
    client,
    setClient,
    handleAdaugare,
    removeClient
  }

}

export const useClientInputs = ()=>{
  const [nume, setNume] = useState("")
  const [telefon, setTelefon] = useState("")
  const [email, setEmail] = useState("")
  const [numeError, setNumeError] = useState("");
  const [telefonError, setTelefonError] = useState("");
  const [emailError, setEmailError] = useState("");
  

  function handleClient(event) {
    setNume(event.target.value)
  };

  function handleTelefon(event) {
    setTelefon(event.target.value)
  };

  function handleEmail(event) {
    setEmail(event.target.value)
  };

  return {
    nume, setNume,
    telefon, setTelefon,
    email, setEmail,
    handleClient,
    handleTelefon,
    handleEmail,
    numeError, setNumeError,
    telefonError, setTelefonError,
    emailError, setEmailError,
  }
}