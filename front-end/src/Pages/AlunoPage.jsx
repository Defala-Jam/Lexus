import { useState, useEffect } from 'react';

const AlunoPage = ({ imageURL, turma, nome }) => {
  const [dissertacao, setDissertacao] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    // Checa se já foi entregue
    const chave = `${turma}_${nome}`;
    const entregas = JSON.parse(localStorage.getItem('entregas') || '{}');
    if (entregas[chave]) {
      setEnviado(true);
    }
  }, [turma, nome]);

  const handleSubmit = () => {
    if (!dissertacao.trim()) {
      alert('Digite sua dissertação antes de enviar.');
      return;
    }

    const chave = `${turma}_${nome}`;
    const entregas = JSON.parse(localStorage.getItem('entregas') || '{}');
    entregas[chave] = true;
    localStorage.setItem('entregas', JSON.stringify(entregas));
    setEnviado(true);
    alert('Dissertação enviada com sucesso!');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Olá, {nome}!</h2>
      <p className="text-gray-600">Turma: {turma}</p>

      {imageURL && (
        <div>
          <h3 className="font-medium mb-2">Imagem da dissertação:</h3>
          <img
            src={imageURL}
            alt="Imagem para dissertação"
            className="max-w-xs rounded shadow"
          />
        </div>
      )}

      <textarea
        rows="8"
        placeholder="Escreva sua dissertação aqui..."
        className="w-full p-2 border rounded"
        value={dissertacao}
        onChange={(e) => setDissertacao(e.target.value)}
        disabled={enviado}
      />

      <button
        onClick={handleSubmit}
        className={`w-full p-2 rounded text-white ${
          enviado ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
        disabled={enviado}
      >
        {enviado ? 'Dissertação enviada' : 'Enviar dissertação'}
      </button>
    </div>
  );
};

export default AlunoPage;
