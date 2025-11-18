/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";

export default function TestForm() {
  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //function executed on form submit
  const onSubmit = (data: any) => {
    console.log("Datos enviados:", data);
    alert("Formulario enviado");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-700 rounded-xl">
      <h2 className="text-xl mb-4">Escribe tu nombre</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          {...register("name", { required: "El nombre es obligatorio" })}
          className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 text-white"
        />


        {errors.name && (
          <p className="text-red-400 text-sm">
            {errors.name.message as string}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 py-2 rounded"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
