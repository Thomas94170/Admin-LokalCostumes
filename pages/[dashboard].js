import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Menu from "../components/menu";

export default function Dashboard() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [adminInfoRes, setAdminInfoRes] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token ici " + token + " stop ici!");
    if (!token) {
      router.push("/"); // Rediriger vers la page de login si le token n'est pas présent dans le localStorage
      console.log("erreur token ici");
      return;
    }

    const fetchAdminInfo = async () => {
      console.log("fonction fetchAdminInfo appelée");
      try {
        const adminInfoResponse = await axios({
          method: "post",
          url: "http://localhost:5400/admin/getAdminInfo",
        });
        const adminInfoRes = adminInfoResponse.data;
        console.log("fonction fetchAdminInfo appelée");
        console.log(adminInfoRes);
        setAdminInfoRes(adminInfoRes);
        // Sauvegarder les informations de l'utilisateur dans le stockage local
        localStorage.setItem("adminInfo", JSON.stringify(adminInfoRes));
        console.log(
          localStorage.setItem("adminInfo", JSON.stringify(adminInfoRes))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminInfo();
  }, []);

  return (
    <>
      <Menu />
    </>
  );
}
