import React from "react";
import Navorders from "../components/navorders";
import Image from "next/image";
import mask3 from "../public/mask3.jpg";

export default function Orders() {
  return (
    <>
      <Navorders />
      <Image
        alt="background"
        src={mask3}
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
