import React from "react";
import Navcostumes from "../components/navcostumes";
import Image from "next/image";
import mask4 from "../public/mask4.jpg";

export default function Costumes() {
  return (
    <>
      <Navcostumes />
      <Image
        alt="background"
        src={mask4}
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
