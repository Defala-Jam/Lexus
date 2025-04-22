export default function ImageUpload({ onUpload }) {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        onUpload(imageURL);
      }
    };
  
    return (
      <div className="mb-4">
        <label className="block mb-2 font-medium">Professor: envie uma imagem</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    );
  }
  