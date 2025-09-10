import { useState } from "react";

function MovementForm({ bebidas, secoes, onSubmit }) {
  const [form, setForm] = useState({
    operacao: "ENTRADA",
    bebida_id: bebidas?.[0]?.id || "",
    secao_id: secoes?.[0]?.id || "",
    quantidade: "",
    responsavel: "",
    descricao: "",
    tipo_bebida: "ALCOOLICA", // ← CAMPO FALTANDO
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm({
      operacao: "ENTRADA",
      bebida_id: bebidas?.[0]?.id || "",
      secao_id: secoes?.[0]?.id || "",
      quantidade: "",
      responsavel: "",
      descricao: "",
      tipo_bebida: "ALCOOLICA", // ← RESETAR TAMBÉM
    });
  }

  return (
    <form
      className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-lg mt-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-2">Lançar movimentação</h2>
      <select
        name="operacao"
        value={form.operacao}
        onChange={handleChange}
        required
      >
        <option value="ENTRADA">Entrada</option>
        <option value="SAIDA">Saída</option>
      </select>
      <select
        name="bebida_id"
        value={form.bebida_id}
        onChange={handleChange}
        required
      >
        {bebidas.map((b) => (
          <option key={b.id} value={b.id}>{b.nome}</option>
        ))}
      </select>
      <select
        name="secao_id"
        value={form.secao_id}
        onChange={handleChange}
        required
      >
        {secoes.map((s) => (
          <option key={s.id} value={s.id}>{s.secao}</option>
        ))}
      </select>
      
      {/* ← CAMPO NOVO */}
      <select
        name="tipo_bebida"
        value={form.tipo_bebida}
        onChange={handleChange}
        required
      >
        <option value="ALCOOLICA">Alcoólica</option>
        <option value="NAO_ALCOOLICA">Não alcoólica</option>
      </select>
      
      
      <input
        name="quantidade"
        type="number"
        value={form.quantidade}
        onChange={handleChange}
        required
        placeholder="Quantidade"
        min={1}
      />
      <input
        name="responsavel"
        value={form.responsavel}
        onChange={handleChange}
        required
        placeholder="Responsável"
      />
      <input
        name="descricao"
        value={form.descricao}
        onChange={handleChange}
        placeholder="Descrição (opcional)"
      />
      <button
        type="submit"
        className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
      >
        Lançar movimentação
      </button>
    </form>
  );
}

export default MovementForm;