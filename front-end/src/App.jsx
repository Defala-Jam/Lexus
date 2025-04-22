import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Cadastro from './Pages/Cadastro';
import LoginPage from './Pages/Logging'; // Certifique-se que o nome do arquivo é Logging.jsx

function App() {
  return (
    <div>
      {/* Você pode alternar entre FrontPage ou LoginPage */}
      <Cadastro />
      {/* <Cadastro /> */}
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;
