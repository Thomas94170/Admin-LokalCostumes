import { useState } from "react";
import axios from "axios";

export default function Addcostume() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImageDeux, setSelectedImageDeux] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log(files);
  };

  const handleImageDeuxChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImageDeux(files);
    console.log(files);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("imageUne", file);
        console.log(formData);
      });

      selectedImageDeux.forEach((file) => {
        formData.append("imageDeux", file);
        console.log(formData);
      });

      formData.append("titre", String(titre));
      formData.append("description", String(description));
      formData.append("prix", String(prix));

      console.log("Données envoyées au serveur :");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axios.post("http://localhost:5400/costume/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Afficher une alerte de confirmation
      alert("Costume ajouté avec succès");

      setSelectedFiles([]); // Clear the selected files
      setSelectedImageDeux([]);
    } catch (error) {
      console.error(error);
      alert("Erreur dans la sauvegarde du costume " + error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <input
          className="mb-3"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <input
          className="mb-3"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageDeuxChange} // Vous devrez définir handleImageDeuxChange de manière similaire à handleFileChange pour gérer la deuxième image
        />
        <input
          className="w-full mb-3"
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <textarea
          className="w-full mb-3"
          placeholder="Descriptif"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="w-full mb-3"
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
        <button className="m-5" onClick={handleUpload}>
          Ajouter le costume
        </button>
      </div>
    </div>
  );
}
