import { useState } from 'react';
import SectionCard from './components/SectionCard';
import BeverageForm from './components/BeverageForm';
import MovementForm from './components/MovementForm';
import MovementsTable from './components/MovementsTable';
import SectionForm from './components/SectionForm';


import Modal from './components/Modal';




function App() {
  const secoes = [
    { secao: 'Cervejas', capacidade_ml: 10000, volume_ocupado: 3500 },
    { secao: 'Vinhos', capacidade_ml: 8000, volume_ocupado: 2000 },
    { secao: 'Refrigerantes', capacidade_ml: 12000, volume_ocupado: 7000 },
  ];

  const bebidas = [
    { nome: "Skol", marca: "Ambev", tipo_bebida: "ALCOOLICA", secao: "Cervejas", volume_ml: 350 },
    { nome: "Coca-Cola", marca: "Coca-Cola", tipo_bebida: "NAO_ALCOOLICA", secao: "Refrigerantes", volume_ml: 600 },
  ];

  const movimentos = [
    {
      data_hora: "2025-09-09 14:21",
      operacao: "ENTRADA",
      bebida: "Skol",
      secao: "Cervejas",
      volume: 1000,
      responsavel: "Lucas",
      observacao: "Reabastecimento semanal",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
    {
      data_hora: "2025-09-09 14:23",
      operacao: "SAIDA",
      bebida: "Coca-Cola",
      secao: "Refrigerantes",
      volume: 500,
      responsavel: "Lucas",
      observacao: "Venda balcão",
    },
  ];

  // Controle dos modais
  const [openBebida, setOpenBebida] = useState(false);
  const [openMov, setOpenMov] = useState(false);
  const [openSecao, setOpenSecao] = useState(false);

  function handleAddBebida(data) {
    alert(`Bebida cadastrada!\n${JSON.stringify(data, null, 2)}`);
    setOpenBebida(false);
  }

  function handleMovimentacao(data) {
    alert(`Movimentação lançada!\n${JSON.stringify(data, null, 2)}`);
    setOpenMov(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-2 sm:px-6 flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Sistema de Estoque de Bebidas
        </h1>

        <div className="flex flex-wrap gap-4 mb-4 w-full justify-center">
          {secoes.map((s, idx) => (
            <SectionCard key={idx} secao={s} />
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
  <SectionForm onSubmit={(data) => {
    alert(`Seção cadastrada!\n${JSON.stringify(data, null, 2)}`);
    setOpenSecao(false);
    // Aqui depois você adiciona a seção ao estado das seções, se quiser!
  }} />
</Modal>

      </div>
    </div>
  );
}

export default App;
