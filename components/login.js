import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5400/admin/authorisations`,
        {
          identifiant: identifiant,
          password: password,
        }
      );
      const { data, status } = res;

      if (status === 200 && data) {
        console.log("gotdata:", data);
        const token = data.token;
        console.log(token);

        localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(data.admin));

        router.push("/dashboard");

        setTimeout(() => {
          if (router.pathname !== "/dashboard") {
            console.log("redirection vers le profil ok");
          }
        }, 10000);
      } else {
        setError("Identifiants invalides");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div class="container">
        <div class="form-container">
          <form onSubmit={handleSubmit}>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Identifiant
              </label>
              <input
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                required
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="flex justify-center">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
