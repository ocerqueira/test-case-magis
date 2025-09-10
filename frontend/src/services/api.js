const API_URL = "http://localhost:8002"; // ajuste se necessário

export async function criarSecao(data) {
  // Só envia o que o backend espera (nome e tipo)
  const resp = await fetch(`${API_URL}/secoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secao: data.secao,
      tipo_secao: data.tipo_secao,
      // capacidade_ml será definido no backend!
    }),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.erro || "Erro ao cadastrar seção");
  }
  return await resp.json();
}

// Você pode criar getSecoes(), atualizarSecao(), etc
