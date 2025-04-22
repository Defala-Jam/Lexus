import { useEffect, useState } from 'react';

function ProfessorPage({ turma }) {
  const [alunos, setAlunos] = useState([]);
  const [redacoes, setRedacoes] = useState({});
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const chaveAlunos = `${turma}_alunos`;
    const chaveRedacoes = `${turma}_redacoes`;
    const alunosSalvos = JSON.parse(localStorage.getItem(chaveAlunos)) || [];
    const redacoesSalvas = JSON.parse(localStorage.getItem(chaveRedacoes)) || {};

    // Carregar alunos e redações
    setAlunos(alunosSalvos);
    setRedacoes(redacoesSalvas);

    // Carregar imagem salva
    const imagemSalva = localStorage.getItem(`${turma}_imagem`);
    if (imagemSalva) {
      setImageURL(imagemSalva);
    }
  }, [turma]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImageURL(base64);
        localStorage.setItem(`${turma}_imagem`, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageURL(null);
    localStorage.removeItem(`${turma}_imagem`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Painel do Professor</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Imagem da proposta:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        
        {imageURL && (
          <div className="mt-2">
            <img
              src={imageURL}
              alt="Imagem da proposta"
              className="max-w-md rounded shadow"
            />
            <button
              onClick={handleRemoveImage}
              className="mt-2 text-red-500 text-sm"
            >
              Remover imagem
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Alunos da sala "{turma}":</h3>
        {alunos.length === 0 ? (
          <p className="text-gray-500">Nenhum aluno registrado ainda.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {alunos.map((nome) => (
              <li key={nome} className="flex items-center gap-2">
                <span>{nome}</span>
                {redacoes[nome] ? (
                  <span className="text-green-600 text-sm">(Entregue)</span>
                ) : (
                  <span className="text-red-500 text-sm">(Não entregou)</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProfessorPage;
