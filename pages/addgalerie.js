import { useState } from "react";
import axios from "axios";

export default function Addgalerie() {
  const [selectedFiles, setSelectedFiles] = useState([]);

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

      await axios.post("http://localhost:5400/uploads/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Afficher une alerte de confirmation
      alert("Photo ajoutée à la galerie avec succès");

      setSelectedFiles([]); // Clear the selected files
    } catch (error) {
      console.error(error);
      alert("Erreur dans la sauvegarde de la photo " + error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <input
          className=""
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <button className="m-5" onClick={handleUpload}>
          Ajouter une photo
        </button>
      </div>
    </div>
  );
}
