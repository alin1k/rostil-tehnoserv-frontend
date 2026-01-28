import { useState, useEffect } from "react";
import { fetchFurnizori, addFurnizor, deleteFurnizor } from "../api";

export const useFurnizor = () => {
  const [furnizor, setFurnizor] = useState([]);

  useEffect(() => {
    const getFurnizori = async () => {
      try {
        const data = await fetchFurnizori();
        setFurnizor(data);
      } catch (error) {
        console.error("Error fetching furnizori:", error);
      }
    };
    getFurnizori();
  }, []);

  async function handleAddFurnizor(
    nume,
    adresa,
    email,
    setNume,
    setAdresa,
    setEmail,
    setNumeError,
    setAdresaError,
    setEmailError
  ) {
    let isValid = true;

    setNumeError("");
    setAdresaError("");
    setEmailError("");

    if (!nume) {
      setNumeError("Numele furnizorului este obligatoriu.");
      isValid = false;
    }

    if (!adresa) {
      setAdresaError("Adresa furnizorului este obligatorie.");
      isValid = false;
    }

  
    if (!email) {
      setEmailError("Website-ul furnizorului trebuie să fie valid.");
      isValid = false;
    }

    if (isValid) {
      const newFurnizor = {
        fNume: nume,
        fAdresa: adresa,
        fEmail: email,
      };
      try {
        const addedFurnizor = await addFurnizor(newFurnizor);
        setFurnizor((f) => [...f, addedFurnizor]);
        setNume("");
        setAdresa("");
        setEmail("");
      } catch (error) {
        console.error("Error adding furnizor:", error);
      }
    }
  }

  async function removeFurnizor(id){
    try {
      await deleteFurnizor(id);
      setFurnizor(prev => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Error deleting furnizor:", error);
    }
  }

  return {
    furnizor,
    setFurnizor,
    handleAddFurnizor,
    removeFurnizor
  };
};

export const useFurnizorInputs = () => {
  const [nume, setNume] = useState("");
  const [email, setEmail] = useState("");
  const [adresa, setAdresa] = useState("");

  const [numeError, setNumeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [adresaError, setAdresaError] = useState("");

  function handleNume(event) {
    setNume(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleAdresa(event) {
    setAdresa(event.target.value);
  }

  return {
    nume,
    setNume,
    email,
    setEmail,
    adresa,
    setAdresa,
    numeError,
    setNumeError,
    emailError,
    setEmailError,
    adresaError,
    setAdresaError,
    handleNume,
    handleEmail,
    handleAdresa,
  };
};