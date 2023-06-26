import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Viewcostumes() {
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

  return (
    <>
      <h1 className="text-center text-xl">Costumes disponible</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md rounded-md">
            <p className="text-center">{item.titre}</p>
            <br />
            <div className="flex justify-center">
              <img
                className="m-2"
                src={item.imageUne}
                alt={item.id}
                width={150}
              />
              <img
                className="m-2"
                src={item.imageDeux}
                alt={item.id}
                width={150}
              />
            </div>
            <p className="text-center">{item.description}</p>
            <br />
            <p className="text-center">{item.prix}€/jour</p>
          </div>
        ))}
      </div>
      <br />
      <Link href="costumes">Retour</Link>
    </>
  );
}
