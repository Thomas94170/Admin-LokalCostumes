import React from "react";
import Navclients from "../components/navclients";
import Image from "next/image";
import mask2 from "../public/mask2.jpg";

export default function Clients() {
  return (
    <>
      <Navclients />
      <Image
        alt="background"
        src={mask2}
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
