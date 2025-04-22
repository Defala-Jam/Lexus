import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfessorPage from './Pages/ProfessorPage';
import AlunoPage from './Pages/AlunoPage';

function App() {
  const [userType, setUserType] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [senha, setSenha] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [salas, setSalas] = useState({});
  const [nomeAluno, setNomeAluno] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await axios.get('http://localhost:3001/imagem');
        if (res.data?.url) {
          setImageURL(res.data.url);
        }
      } catch (err) {
        console.error('Erro ao buscar imagem:', err);
      }
    }
    fetchImage();
  }, []);

  const handleLogin = () => {
    if (!nomeAluno.trim()) {
      alert('Digite seu nome.');
      return;
    }

    if (userType === 'aluno' && salas[turmaSelecionada] === senha) {
      const chave = `${turmaSelecionada}_alunos`;
      const alunos = JSON.parse(localStorage.getItem(chave) || '[]');

      if (!alunos.includes(nomeAluno)) {
        localStorage.setItem(chave, JSON.stringify([...alunos, nomeAluno]));
      }

      setLoggedIn(true);
    } else {
      alert('Senha incorreta ou sala inexistente.');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setLoggedIn(false);
    setSenha('');
    setTurmaSelecionada('');
    setImageURL(null);
    setNomeAluno('');
  };

  const handleCreateRoom = () => {
    if (turmaSelecionada && senha) {
      if (salas[turmaSelecionada]) {
        alert('Essa sala já existe.');
        return;
      }

      setSalas((prev) => ({ ...prev, [turmaSelecionada]: senha }));
      localStorage.setItem(`${turmaSelecionada}_alunos`, JSON.stringify([]));
      setLoggedIn(true);
    } else {
      alert('Preencha o nome da sala e a senha');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (userType === 'aluno') {
        handleLogin();
      } else if (userType === 'professor') {
        handleCreateRoom();
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">Ambiente de Redação</h1>

      {!loggedIn ? (
        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setUserType('professor')}
              className={`px-4 py-2 rounded ${
                userType === 'professor' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Professor
            </button>
            <button
              onClick={() => setUserType('aluno')}
              className={`px-4 py-2 rounded ${
                userType === 'aluno' ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}
            >
              Aluno
            </button>
          </div>

          {userType === 'professor' && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Nome da nova sala"
                value={turmaSelecionada}
                onChange={(e) => setTurmaSelecionada(e.target.value)}
                className="w-full p-2 border"
                onKeyDown={handleKeyPress}
              />
              <input
                type="password"
                placeholder="Defina uma senha para a sala"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2 border"
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleCreateRoom}
                className="w-full bg-blue-600 text-white p-2 rounded"
              >
                Criar Sala
              </button>
            </div>
          )}

          {userType === 'aluno' && (
            <>
              <select
                value={turmaSelecionada}
                onChange={(e) => setTurmaSelecionada(e.target.value)}
                className="w-full p-2 border"
              >
                <option value="">Selecione a turma</option>
                {Object.keys(salas).map((turma) => (
                  <option key={turma} value={turma}>
                    {turma}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Digite seu nome"
                value={nomeAluno}
                onChange={(e) => setNomeAluno(e.target.value)}
                className="w-full p-2 border"
                onKeyDown={handleKeyPress}
              />

              <input
                type="password"
                placeholder="Digite a senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2 border"
                onKeyDown={handleKeyPress}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-600 text-white p-2 rounded"
              >
                Entrar
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">
              Logado como: {userType === 'professor' ? 'Professor' : `Aluno - ${nomeAluno}`}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline text-sm"
            >
              Sair
            </button>
          </div>

          {userType === 'professor' && <ProfessorPage imageURL={imageURL} turma={turmaSelecionada} />}
          {userType === 'aluno' && (
            <AlunoPage imageURL={imageURL} turma={turmaSelecionada} nome={nomeAluno} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
