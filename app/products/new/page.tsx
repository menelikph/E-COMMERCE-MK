/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadImage } from "@/lib/cloudinary";

const schema = yup.object({
  name: yup.string().required("Name is required"),
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
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  reference: yup.string().required("Reference is required"),
  image: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value: any) => value && value.length > 0
    ),
});

export default function NewProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      console.log("FORM RAW DATA:", data);

      const file = data.image[0];

      const imageUrl = await uploadImage(file);
      console.log("IMAGE URL:", imageUrl);

      const newProduct = {
        name: data.name,
        price: Number(data.price),
        quantity: Number(data.quantity),
        reference: data.reference,
        description: data.description,
        imageUrl,
      };

      console.log("PRODUCT READY:", newProduct);

      alert("Product prepared! (still not saved)");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

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
          />
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">
              {errors.image.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
