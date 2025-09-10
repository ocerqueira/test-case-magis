import { useState } from "react";

function MovementsTable({ movimentos }) {
  // Paginação simples
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(movimentos.length / rowsPerPage);
  const currentRows = movimentos.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  function goToPage(n) {
    if (n < 1 || n > totalPages) return;
    setPage(n);
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Histórico de Movimentações</h2>
      <table className="min-w-[600px] w-full text-sm text-left">
        <thead>
          <tr>
            <th className="font-semibold pb-2">Data/Hora</th>
            <th className="font-semibold pb-2">Operação</th>
            <th className="font-semibold pb-2">Bebida</th>
            <th className="font-semibold pb-2">Seção</th>
            <th className="font-semibold pb-2">Volume (ml)</th>
            <th className="font-semibold pb-2">Responsável</th>
            <th className="font-semibold pb-2">Observação</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((mov, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td>{mov.data_hora}</td>
                <td className={mov.operacao === "ENTRADA" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {mov.operacao}
                </td>
                <td>{mov.bebida}</td>
                <td>{mov.secao}</td>
                <td>{mov.volume_ml}</td>
                <td>{mov.responsavel}</td>
                <td>{mov.observacao}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-6">Nenhuma movimentação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Paginação */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default MovementsTable;
