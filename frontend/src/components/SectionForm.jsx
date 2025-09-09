import { useState } from "react";

function SectionForm({ onSubmit }) {
  const [form, setForm] = useState({
    secao: "",
    tipo_secao: "ALCOOLICA",
    capacidade_ml: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm({
      secao: "",
      tipo_secao: "ALCOOLICA",
      capacidade_ml: "",
    });
  }

  return (
    <form
      className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-2">Cadastrar nova seção</h2>
      <input
        className="border p-2 rounded"
        name="secao"
        placeholder="Nome da seção"
        value={form.secao}
        onChange={handleChange}
        required
      />
      <select
        className="border p-2 rounded"
        name="tipo_secao"
        value={form.tipo_secao}
        onChange={handleChange}
        required
      >
        <option value="ALCOOLICA">Alcoólica</option>
        <option value="NAO_ALCOOLICA">Não alcoólica</option>
      </select>
      <input
        className="border p-2 rounded"
        name="capacidade_ml"
        placeholder="Capacidade total (ml)"
        type="number"
        value={form.capacidade_ml}
        onChange={handleChange}
        required
        min={100}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700"
      >
        Cadastrar Seção
      </button>
    </form>
  );
}

export default SectionForm;
