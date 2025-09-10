import { useEffect, useState } from 'react';
import SectionCard from './components/SectionCard';
import BeverageForm from './components/BeverageForm';
import MovementForm from './components/MovementForm';
import MovementsTable from './components/MovementsTable';
import SectionForm from './components/SectionForm';
import Modal from './components/Modal';
import SectionDetailsModal from './components/SectionDetails';

function App() {
  // States
  const [secoes, setSecoes] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [movimentos, setMovimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [openBebida, setOpenBebida] = useState(false);
  const [openMov, setOpenMov] = useState(false);
  const [openSecao, setOpenSecao] = useState(false);
  const [openDetalhes, setOpenDetalhes] = useState(false);
  const [secaoSelecionada, setSecaoSelecionada] = useState(null);

  // Carregar dados da API ao abrir a tela
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8002/secoes').then(res => res.json()),
      fetch('http://localhost:8002/bebidas').then(res => res.json()),
      fetch('http://localhost:8002/historico').then(res => res.json()),
    ])
    .then(([secoesData, bebidasData, movimentosData]) => {
      setSecoes(secoesData);
      setBebidas(bebidasData);
      setMovimentos(movimentosData);
      setLoading(false);
    })
    .catch(() => setLoading(false)); 
  }, []);

  // Helpers para recarregar (depois de cadastrar algo novo)
  const reloadSecoes = () =>
    fetch('http://localhost:8002/secoes')
      .then(res => res.json())
      .then(data => setSecoes(data));
  const reloadBebidas = () =>
    fetch('http://localhost:8002/bebidas')
      .then(res => res.json())
      .then(data => setBebidas(data));
  const reloadMovimentos = () =>
    fetch('http://localhost:8002/historico')
      .then(res => res.json())
      .then(data => setMovimentos(data));

  // Handlers dos formulários
  function handleAddBebida(data) {
    fetch('http://localhost:8002/bebidas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        reloadBebidas();
        setOpenBebida(false);
      })
      .catch(() => alert('Erro ao cadastrar bebida'));
  }

  function handleMovimentacao(data) {
    fetch('http://localhost:8002/historico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        reloadMovimentos();
        reloadSecoes(); 
        setOpenMov(false);
      })
      .catch(() => alert('Erro ao registrar movimentação'));
  }

   function handleDetalhesSecao(secao) {
    setSecaoSelecionada(secao);
    setOpenDetalhes(true);
  }

  function handleAddSecao(data) {
    fetch('http://localhost:8002/secoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
        reloadSecoes();
        setOpenSecao(false);
      })
      .catch(() => alert('Erro ao cadastrar seção'));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xl">Carregando dados...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-2 sm:px-6 flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Sistema de Estoque de Bebidas
        </h1>

        <div className="flex flex-wrap gap-4 mb-4 w-full justify-center">
        {secoes.map((s) => (
          <SectionCard key={s.id} secao={s} onDetalhes={handleDetalhesSecao} />
        ))}
      </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 w-full justify-center items-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            onClick={() => setOpenBebida(true)}
          >
            Cadastrar Bebida
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            onClick={() => setOpenMov(true)}
          >
            Lançar Movimentação
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
            onClick={() => setOpenSecao(true)}
          >
            Cadastrar Seção
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <MovementsTable movimentos={movimentos} />
        </div>

        {/* Modais */}
        <Modal isOpen={openBebida} onClose={() => setOpenBebida(false)}>
          <BeverageForm secoes={secoes} onSubmit={handleAddBebida} />
        </Modal>

        <Modal isOpen={openMov} onClose={() => setOpenMov(false)}>
          <MovementForm bebidas={bebidas} secoes={secoes} onSubmit={handleMovimentacao} />
        </Modal>

        <Modal isOpen={openSecao} onClose={() => setOpenSecao(false)}>
          <SectionForm onSubmit={handleAddSecao} />
        </Modal>

        <SectionDetailsModal 
  isOpen={openDetalhes} 
  onClose={() => setOpenDetalhes(false)}
  secao={secaoSelecionada}
  bebidas={bebidas}
/>
      </div>
    </div>
  );
}

export default App;
