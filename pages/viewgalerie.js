import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Viewgalerie() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5400/gallerie");
        setData(response.data);
        console.log(response);
        // setData(jsonData);
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
          <div key={item._id}>
            <div className=" ">
              <div className="flex justify-center ">
                <img
                  className="img-galerie m-2 rounded-md hover:scale-150 transition duration-300 ease-out m-10"
                  src={`http://localhost:5400/gallerie/${item.imageGallerie}`}
                  alt={item._id}
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
