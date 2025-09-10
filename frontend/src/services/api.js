const API_URL = "http://localhost:8002"; 

export async function criarSecao(data) {
  
  const resp = await fetch(`${API_URL}/secoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secao: data.secao,
      tipo_secao: data.tipo_secao,
      
    }),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.erro || "Erro ao cadastrar seção");
  }
  return await resp.json();
}


