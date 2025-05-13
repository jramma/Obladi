"use client";

import { useEffect, useState } from "react";

let _showModalExternally: (msg: string) => void = () => {};

export const showGlobalModal = (msg: string) => {
  _showModalExternally(msg);
};

export const GlobalModal = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showModal = (msg: string) => setMessage(msg);
  const hideModal = () => setMessage(null);

  useEffect(() => {
    _showModalExternally = showModal;
  }, []);

  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg bg-opacity-50">
      <div className="bg-white dark:bg-black card-style p-8 text-center space-y-4 max-w-[90%] sm:max-w-md">
        <h3 className="text-2xl font-bold">Hey listen!</h3>
        <p>{message}</p>
        <button
          aria-label="Cerrar modal"
          className="mt-4 px-6 py-2 bg-primary rounded font-semibold"
          onClick={hideModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
