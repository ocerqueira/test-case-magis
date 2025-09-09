function SectionCard({ secao }) {
  const { secao: nome, capacidade_ml, volume_ocupado } = secao;
  const pctLivre = ((capacidade_ml - volume_ocupado) / capacidade_ml) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <h2 className="text-lg font-bold">{nome}</h2>
      <div className="flex items-center gap-2">
        <span className="font-semibold">Volume:</span>
        <span>{volume_ocupado} / {capacidade_ml} ml</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 my-1">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${pctLivre}%` }}
        />
      </div>
      <span className="text-sm text-gray-600">
        Espaço livre: {pctLivre.toFixed(1)}%
      </span>
    </div>
  );
}

export default SectionCard;
