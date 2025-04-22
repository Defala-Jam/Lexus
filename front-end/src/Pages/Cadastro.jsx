import React, { useState } from "react";
import TextField from "../Components/TextField";

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('aluno');
  const [erros, setErros] = useState({
    nome: '',
    email: '',
    senha: '',
    geral: ''
  });
  const [carregando, setCarregando] = useState(false);

  const validarCampos = () => {
    const novosErros = {
      nome: !nome ? 'Nome é obrigatório' : '',
      email: !email ? 'Email é obrigatório' : !email.includes('@') ? 'Email inválido' : '',
      senha: !senha ? 'Senha é obrigatória' : senha.length < 8 ? 'Senha deve ter pelo menos 8 caracteres' : '',
      geral: ''
    };

    setErros(novosErros);
    return !Object.values(novosErros).some(erro => erro !== '');
  };

  const cadastrarUsuario = async () => {
    if (!validarCampos()) return;
    
    setCarregando(true);
    setErros(prev => ({...prev, geral: ''}));

    try {
      const response = await fetch('http://localhost:5000/api/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, cargo })
      });

      const data = await response.json();

      if (!response.ok) {
        // Trata erros específicos da API
        if (response.status === 409) {
          setErros(prev => ({...prev, email: data.erro}));
        } else {
          setErros(prev => ({...prev, geral: data.erro || 'Erro ao cadastrar'}));
        }
        return;
      }

      alert(data.mensagem);
      // Limpa o formulário após cadastro bem-sucedido
      setNome('');
      setEmail('');
      setSenha('');
      setCargo('aluno');
      
    } catch (err) {
      console.error('Erro:', err);
      setErros(prev => ({...prev, geral: 'Erro de conexão com o servidor'}));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h2>Cadastro de Usuário</h2>

      {erros.geral && (
        <div style={{color: 'red', marginBottom: '1rem'}}>
          {erros.geral}
        </div>
      )}

      <TextField
        label="Nome Completo"
        name="nome"
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
          setErros(prev => ({...prev, nome: ''}));
        }}
        placeholder="Digite seu nome completo"
        required
        error={erros.nome}
      />

      <TextField
        label="Endereço de Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErros(prev => ({...prev, email: ''}));
        }}
        placeholder="seu@email.com"
        required
        error={erros.email}
      />

      <TextField
        label="Senha"
        name="senha"
        type="password"
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
          setErros(prev => ({...prev, senha: ''}));
        }}
        placeholder="Digite sua senha"
        required
        error={erros.senha}
        helperText="Mínimo 8 caracteres com números e letras"
      />

      <div style={{width: '100%'}}>
        <label htmlFor="cargo">Cargo: </label>
        <select
          id="cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          style={{width: '100%', padding: '0.5rem'}}
        >
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>
      </div>

      <button 
        onClick={cadastrarUsuario}
        disabled={carregando}
        style={{
          padding: '0.5rem 1rem',
          background: carregando ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: carregando ? 'not-allowed' : 'pointer',
          width: '100%'
        }}
      >
        {carregando ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </div>
  );
}

export default Cadastro;