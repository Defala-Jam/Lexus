import { useState } from 'react';

function EssayForm() {
  const [dissertation, setDissertation] = useState('');

  const handleChange = (e) => {
    setDissertation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar a dissertação para o backend ou algo semelhante
    console.log('Dissertação enviada:', dissertation);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="h-screen">
        <label className="block mb-2 font-semibold">Escreva sua dissertação:</label>
        <textarea
          value={dissertation}
          onChange={handleChange}
          className="w-full h-full p-2 border rounded-lg"
          placeholder="Escreva sua dissertação aqui..."
        />
        <button type="submit" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded">
          Enviar Dissertação
        </button>
      </form>
    </div>
  );
}

export default EssayForm;
