import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";

export default function Deletecostumes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5400/costume");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("message d'erreur " + error);
      }
    }
    fetchData();
  }, []);

  const handleDeleteCostume = async (id) => {
    try {
      const response = await fetch(`http://localhost:5400/costume/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // La suppression a réussi
        // Mettez à jour l'état de vos costumes ou effectuez toute autre action nécessaire
        console.log("Le costume a été supprimé avec succès " + response);
      } else {
        // La suppression a échoué
        console.error("Erreur lors de la suppression du costume");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du costume", error);
    }
  };

  return (
    <>
      <h1 className="text-center text-xl">Supprimer un costume</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
            <p className="text-center">{item.titre}</p>
            <br />
            <div className="flex justify-center">
              <img
                className="m-2"
                src={item.imageUne}
                alt={item._id}
                width={150}
              />
              <img
                className="m-2"
                src={item.imageDeux}
                alt={item._id}
                width={150}
              />
            </div>
            <p className="text-center">{item.description}</p>
            <br />
            <p className="text-center">{item.prix}€/jour</p>
            <button onClick={() => handleDeleteCostume(item._id)}>
              <ArchiveBoxXMarkIcon className="h-5 w-5" aria-hidden="true" />
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <br />
      <Link href="costumes">Retour</Link>
    </>
  );
}
