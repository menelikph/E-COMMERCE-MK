import * as yup from "yup";

export const productSchema = yup.object({
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

  imageUrl: yup.string().required("Image URL is required"),
});
