'use client'  // Esto asegura que este código se ejecute en el cliente

import { useState } from "react";

interface ProtectedFormProps {
  isOpen: boolean;
  closeLoginModal: () => void;
}

export default function ProtectedForm({ isOpen, closeLoginModal }: ProtectedFormProps) {
  if (!isOpen) return null;  // No mostramos el modal si está cerrado

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Por favor, inicia sesión</h2>
        <button
          onClick={() => window.location.href = '/auth/signin'} // Redirige al login
          className="bg-blue-500 text-white py-2 px-6 rounded-full"
        >
          Ir a Login
        </button>
        <button
          onClick={closeLoginModal}  // Cierra el modal
          className="mt-4 text-red-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}