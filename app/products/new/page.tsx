/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadImage } from "@/lib/cloudinary";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { notifySuccess, notifyError } from "@/utils/toast";



const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Minimum 10 characters")
    .max(500, "Maximum 500 characters"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),

  reference: yup
    .string()
    .required("Reference is required")
    .matches(/^[a-zA-Z0-9\-]+$/, "Only letters, numbers and hyphens allowed"),

  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "Image is too large (max 2MB)", (value: any) => {
      return value && value[0] && value[0].size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported image format", (value: any) => {
      return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
    }),
});

export default function NewProductPage() {
  // react-hook-form setup
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // state for image preview
  const [preview, setPreview] = useState<string | null>(null);

  // function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      // image upload process
      const file = data.image[0];
      if (!file) return notifyError("No image selected");

      const imageUrl = await uploadImage(file);

      const newProduct = {
        name: data.name,
        price: data.price,
        description: data.description,
        quantity: data.quantity,
        reference: data.reference,
        imageUrl, // <-- URL CLOUDINARY
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      notifySuccess("Product saved successfully!");
    } catch (error: any) {
      console.error(error);
      notifyError(error.message);
    }
  };

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Acceso restringido
        </h2>
        <p className="text-gray-300 mb-6">
          Debes iniciar sesión para agregar un producto.
        </p>

        <button
          onClick={() => signIn("google")}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border border-gray-800 p-6 rounded-xl bg-gray-950"
      >
        {/* NAME */}
        <div>
          <label className="block text-gray-300 mb-1">Product Name</label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-gray-300 mb-1">Price</label>
          <input
            {...register("price")}
            type="number"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none"
          />
          {errors.price && (
            <p className="text-red-400 text-sm mt-1">
              {errors.price.message as string}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-300 mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none h-24 resize-none"
          ></textarea>

          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* QUANTITY */}
        <div>
          <label className="block text-gray-300 mb-1">Quantity</label>
          <input
            {...register("quantity")}
            type="number"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none"
          />
          {errors.quantity && (
            <p className="text-red-400 text-sm mt-1">
              {errors.quantity.message as string}
            </p>
          )}
        </div>

        {/* REFERENCE */}
        <div>
          <label className="block text-gray-300 mb-1">Reference</label>
          <input
            {...register("reference")}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none"
          />
          {errors.reference && (
            <p className="text-red-400 text-sm mt-1">
              {errors.reference.message as string}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-gray-300 mb-1">Image</label>
          <input
            type="file"
            {...register("image")}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-contain rounded-lg border border-gray-700"
              />
            </div>
          )}
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">
              {errors.image.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Saving...
            </>
          ) : (
            "Save Product"
          )}
        </button>
      </form>
    </div>
  );
}
