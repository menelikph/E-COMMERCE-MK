"use client";
import { useState } from "react";

export default function ChangeColor() {
  const [color, setColor] = useState("bg-gray-800");

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${color}`}>
      <h2 className="text-2xl text-white mb-6">Cambia el color del fondo</h2>

      <div className="space-x-4">
        <button
          onClick={() => setColor("bg-purple-700")}
          className="bg-purple-500 px-4 py-2 rounded text-white"
        >
          Morado
        </button>
        <button
          onClick={() => setColor("bg-blue-700")}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Azul
        </button>
        <button
          onClick={() => setColor("bg-gray-800")}
          className="bg-gray-500 px-4 py-2 rounded text-white"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
