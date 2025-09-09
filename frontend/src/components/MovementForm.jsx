import { useState } from "react";

function MovementForm({ bebidas, secoes, onSubmit }) {
  const [form, setForm] = useState({
    operacao: "ENTRADA",
    bebida: bebidas?.[0]?.nome || "",
    secao: secoes?.[0]?.secao || "",
    volume: "",
    responsavel: "",
    observacao: "",
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
      bebida: bebidas?.[0]?.nome || "",
      secao: secoes?.[0]?.secao || "",
      volume: "",
      responsavel: "",
      observacao: "",
    });
  }

  return (
    <form
      className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-lg mt-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-2">Lançar movimentação</h2>
      <select
        className="border p-2 rounded"
        name="operacao"
        value={form.operacao}
        onChange={handleChange}
        required
      >
        <option value="ENTRADA">Entrada</option>
        <option value="SAIDA">Saída</option>
      </select>
      <select
        className="border p-2 rounded"
        name="bebida"
        value={form.bebida}
        onChange={handleChange}
        required
      >
        {bebidas.map((b, idx) => (
          <option key={idx} value={b.nome}>{b.nome}</option>
        ))}
      </select>
      <select
        className="border p-2 rounded"
        name="secao"
        value={form.secao}
        onChange={handleChange}
        required
      >
        {secoes.map((s, idx) => (
          <option key={idx} value={s.secao}>{s.secao}</option>
        ))}
      </select>
      <input
        className="border p-2 rounded"
        name="volume"
        placeholder="Volume (ml)"
        type="number"
        value={form.volume}
        onChange={handleChange}
        required
        min={1}
      />
      <input
        className="border p-2 rounded"
        name="responsavel"
        placeholder="Responsável"
        value={form.responsavel}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 rounded"
        name="observacao"
        placeholder="Observação (opcional)"
        value={form.observacao}
        onChange={handleChange}
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
