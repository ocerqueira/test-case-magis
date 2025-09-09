function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Apenas blur, sem escurecer */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl p-8 min-w-[320px] max-w-lg w-full mx-4 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
          type="button"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
