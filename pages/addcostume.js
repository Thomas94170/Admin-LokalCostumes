import { useState } from "react";
import axios from "axios";

export default function Addcostume() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log(files);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("imageGallerie", file);
        console.log(formData);
      });

      formData.append("titre", titre);
      formData.append("description", description);
      formData.append("prix", prix);

      await axios.post("http://localhost:5400/costume/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Afficher une alerte de confirmation
      alert("Costume ajouté avec succès");

      setSelectedFiles([]); // Clear the selected files
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
