import { useState } from "react";
import Modal from './Modal'; // ← adicionar esta linha no topo do arquivo

function SectionDetailsModal({ isOpen, onClose, secao, bebidas }) {
  if (!isOpen || !secao) return null;

  const bebidasDaSecao = bebidas.filter(b => b.secao_id === secao.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-2">Detalhes da Seção: {secao.secao}</h2>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Tipo:</span>
            <span className="ml-2">{secao.tipo_secao === 'ALCOOLICA' ? 'Alcoólica' : 'Não alcoólica'}</span>
          </div>
          <div>
            <span className="font-semibold">Capacidade:</span>
            <span className="ml-2">{secao.capacidade_ml} ml</span>
          </div>
          <div>
            <span className="font-semibold">Volume ocupado:</span>
            <span className="ml-2">{secao.volume_ocupado} ml</span>
          </div>
          <div>
            <span className="font-semibold">Espaço livre:</span>
            <span className="ml-2">{secao.capacidade_ml - secao.volume_ocupado} ml</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Bebidas cadastradas ({bebidasDaSecao.length})</h3>
          
          {bebidasDaSecao.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Nome</th>
                    <th className="text-left pb-2">Marca</th>
                    <th className="text-left pb-2">Volume (ml)</th>
                  </tr>
                </thead>
                <tbody>
                  {bebidasDaSecao.map((bebida) => (
                    <tr key={bebida.id} className="border-b last:border-none">
                      <td className="py-1">{bebida.nome}</td>
                      <td className="py-1">{bebida.marca}</td>
                      <td className="py-1">{bebida.volume_ml}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Nenhuma bebida cadastrada nesta seção
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SectionDetailsModal;
