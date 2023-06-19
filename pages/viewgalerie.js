import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Viewgalerie() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5400/gallerie");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("message : " + error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-xl">Ma galerie photo</h1>
      <div className="grid grid-cols-3 gap-4  m-3">
        {data.map((item) => (
          <div key={item.id}>
            <div className=" ">
              <div className="flex justify-center ">
                <img
                  className="img-galerie m-2 rounded-md hover:scale-150 transition duration-300 ease-out m-10"
                  src={item.imageGallerie}
                  alt={item.id}
                  width={150}
                ></img>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/galerie">Retour</Link>
    </>
  );
}
