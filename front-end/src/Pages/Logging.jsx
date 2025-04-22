import React, { useState } from "react";
import TextField from "../Components/TextField";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const realizarLogin = () => {
    // Validação simples antes de enviar
    if (!email.includes('@')) {
      setEmailError('Email inválido');
      return;
    } else {
      setEmailError('');
    }

    if (senha.length < 8) {
      setSenhaError('Senha deve ter pelo menos 8 caracteres');
      return;
    } else {
      setSenhaError('');
    }

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.mensagem) {
        setMensagem(`✅ ${data.mensagem}`);
        console.log("Usuário:", data.usuario);
      } else {
        setMensagem(`❌ ${data.erro}`);
      }
    })
    .catch(err => {
      console.error('Erro:', err);
      setMensagem('❌ Erro de conexão com o servidor.');
    });
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial'
    }}>
      <h2>Login</h2>
      <TextField
        label="Endereço de Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
        error={emailError}
        helperText="Nunca compartilharemos seu email"
      />

      <TextField
        label="Senha"
        name="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
        required
        error={senhaError}
        helperText="Mínimo 8 caracteres com números e letras"
      />
      
      <button 
        onClick={realizarLogin} 
        style={{ 
          padding: '8px 16px',
          marginTop: '16px',
          cursor: 'pointer'
        }}
      >
        Entrar
      </button>
      
      {mensagem && (
        <p style={{ 
          marginTop: 20,
          color: mensagem.includes('✅') ? 'green' : 'red'
        }}>
          {mensagem}
        </p>
      )}
    </div>
  );
}

export default LoginPage;