import { useState } from "react";

function BeverageForm({ secoes, onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    marca: "",
    tipo_bebida: "ALCOOLICA",
    secao_id: secoes?.[0]?.id || "", // ← MUDANÇA: secao_id ao invés de secao
    volume_ml: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm({
      nome: "",
      marca: "",
      tipo_bebida: "ALCOOLICA",
      secao_id: secoes?.[0]?.id || "", // ← MUDANÇA: secao_id no reset também
      volume_ml: "",
    });
  }

  return (
    <form
      className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full max-w-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-2">Cadastrar nova bebida</h2>
      <input
        className="border p-2 rounded"
        name="nome"
        placeholder="Nome da bebida"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 rounded"
        name="marca"
        placeholder="Marca"
        value={form.marca}
        onChange={handleChange}
        required
      />
      <select
        className="border p-2 rounded"
        name="tipo_bebida"
        value={form.tipo_bebida}
        onChange={handleChange}
        required
      >
        <option value="ALCOOLICA">Alcoólica</option>
        <option value="NAO_ALCOOLICA">Não alcoólica</option>
      </select>
      <select
        className="border p-2 rounded"
        name="secao_id" // ← MUDANÇA: name="secao_id"
        value={form.secao_id} // ← MUDANÇA: value={form.secao_id}
        onChange={handleChange}
        required
      >
        {secoes.map((s) => (
          <option key={s.id} value={s.id}>{s.secao}</option> // ← MUDANÇA: value={s.id} e key={s.id}
        ))}
      </select>
      <input
        className="border p-2 rounded"
        name="volume_ml"
        placeholder="Volume (ml)"
        type="number"
        value={form.volume_ml}
        onChange={handleChange}
        required
        min={10}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Cadastrar
      </button>
    </form>
  );
}

export default BeverageForm;