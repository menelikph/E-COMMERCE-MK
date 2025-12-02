/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadImage } from "@/lib/cloudinary";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { notifySuccess, notifyError } from "@/utils/toast";
import { useI18n } from "@/app/context/I18nContext";


// --- Constants for Validation ---
const FILE_SIZE = 2 * 1024 * 1024; // 2MB maximum file size
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];



export default function NewProductPage() {
  const { t } = useI18n(); 

  // --- Yup Validation Schema (Redefining it inside to use t()) ---
  // The schema must be defined here to access the t() function within the component closure.
  const schema = yup.object({
    name: yup
      .string()
      .required(t("form.name_required"))
      .min(3, t("form.name_min"))
      .max(100, t("form.name_max")),
    price: yup
      .number()
      .typeError(t("form.price_type_error"))
      .positive(t("form.price_positive"))
      .required(t("form.price_required")),
    description: yup
      .string()
      .required(t("form.description_required"))
      .min(10, t("form.description_min"))
      .max(500, t("form.description_max")),
    quantity: yup
      .number()
      .typeError(t("form.quantity_type_error"))
      .integer(t("form.quantity_integer"))
      .min(0, t("form.quantity_min"))
      .required(t("form.quantity_required")),
    reference: yup
      .string()
      .required(t("form.reference_required"))
      .matches(/^[a-zA-Z0-9\-]+$/, t("form.reference_invalid_chars")),
    image: yup
      .mixed()
      .required(t("form.image_required"))
      .test("fileSize", t("form.image_size_error"), (value: any) => {
        return value && value[0] && value[0].size <= FILE_SIZE;
      })
      .test("fileFormat", t("form.image_format_error"), (value: any) => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }),
  });

  // react-hook-form setup
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // Use the localized schema defined above
    resolver: yupResolver(schema), 
  });

  // state for image preview URL
  const [preview, setPreview] = useState<string | null>(null);

  /**
   * Function to handle form submission: uploads image and posts product data.
   */
  const onSubmit = async (data: any) => {
    try {
      // Image upload process
      const file = data.image[0];
      if (!file) return notifyError(t("toast.no_image_selected")); // Translated error

      // Upload file to Cloudinary
      const imageUrl = await uploadImage(file);

      const newProduct = {
        name: data.name,
        price: data.price,
        description: data.description,
        quantity: data.quantity,
        reference: data.reference,
        imageUrl, // Persistent Cloudinary URL
      };

      // API request to save the product
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      notifySuccess(t("toast.product_saved")); // Translated success message
    } catch (error: any) {
      console.error(error);
      // Display translated error message
      notifyError(error.message || t("toast.generic_error")); 
    }
  };

  // --- Authentication and Loading Checks ---
  
  // Display translated loading status
  if (status === "loading") {
    return <p>{t("common.loading")}</p>;
  }

  // Restrict access for unauthenticated users
  if (!session) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          {t("auth.restricted_access_title")}
        </h2>
        <p className="text-gray-300 mb-6">
          {t("auth.restricted_access_message")}
        </p>

        <button
          onClick={() => signIn("google")}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          {t("auth.login_button")}
        </button>
      </div>
    );
  }

  // --- Product Form ---

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("products.add_new_title")}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border border-gray-800 p-6 rounded-xl bg-gray-950"
      >
        {/* NAME FIELD */}
        <div>
          <label className="block text-gray-300 mb-1">{t("form.label_name")}</label>
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

        {/* PRICE FIELD */}
        <div>
          <label className="block text-gray-300 mb-1">{t("form.label_price")}</label>
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

        {/* DESCRIPTION FIELD */}
        <div>
          <label className="block text-gray-300 mb-1">{t("form.label_description")}</label>
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

        {/* QUANTITY FIELD */}
        <div>
          <label className="block text-gray-300 mb-1">{t("form.label_quantity")}</label>
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

        {/* REFERENCE FIELD */}
        <div>
          <label className="block text-gray-300 mb-1">{t("form.label_reference")}</label>
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

        {/* IMAGE FIELD */}
        <div>
          <label className="block text-gray-300 mb-1">{t("form.label_image")}</label>
          <input
            type="file"
            {...register("image")}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-purple-500 outline-none"
            // Note: The original implementation of onChange can cause memory leaks 
            // if not cleaned up with useEffect/URL.revokeObjectURL.
            // Leaving the original logic as requested not to modify the code outside i18n/comments.
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
              // WARNING: Consider adding cleanup via useEffect for production code.
            }}
          />
          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt={t("form.image_preview_alt")}
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

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              {/* Translated saving status */}
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              {t("form.saving_button_text")}
            </>
          ) : (
            // Translated submit button text
            t("form.save_button_text")
          )}
        </button>
      </form>
    </div>
  );
}