import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Viewgalerie() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5400/uploads");
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
        {data.map((gallery) => (
          <div key={gallery._id}>
            <div className=" ">
              <div className="flex justify-center ">
                <Image
                  className="img-galerie m-2 rounded-md hover:scale-150 transition duration-300 ease-out m-10"
                  src={`/uploads/${gallery.imageGallerie}`}
                  alt={gallery._id}
                  width={150}
                  height={150} // Set the height of the image
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/galerie">Retour</Link>
    </>
  );
}
