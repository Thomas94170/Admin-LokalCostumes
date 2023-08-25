import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";

export default function Deletegalerie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5400/gallerie");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("message d'erreur " + error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteGalerie = async (imageGallerie) => {
    try {
      const response = await fetch(
        `http://localhost:5400/gallerie/${imageGallerie}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // La suppression a réussi
        // Mettez à jour l'état de vos costumes ou effectuez toute autre action nécessaire
        alert("L'image a été supprimé avec succès");
        console.log("L'image a été supprimé avec succès");
      } else {
        // La suppression a échoué
        console.error("Erreur lors de la suppression de l'image");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-xl">Supprimer une image de la galerie</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
            <div className="flex justify-center">
              <Image
                src={`/uploads/${item.imageGallerie}`}
                alt={item.imageGallerie}
                width={150}
                height={150}
              />
            </div>
            <p className="flex justify-center">{item.imageGallerie}A</p>
            <button onClick={() => handleDeleteGalerie(item.imageGallerie)}>
              <ArchiveBoxXMarkIcon className="h-5 w-5" aria-hidden="true" />
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <br />
      <Link href="galerie">Retour</Link>
    </>
  );
}
