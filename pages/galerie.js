import React from "react";
import Navgalerie from "../components/navgalerie";
import Image from "next/image";
import mask5 from "../public/mask5.jpg";

export default function Galerie() {
  return (
    <>
      <Navgalerie />
      <Image
        alt="background"
        src={mask5}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      />
    </>
  );
}
