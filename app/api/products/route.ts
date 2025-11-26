/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendEmail } from "@/lib/nodemailer";
import { productSchema } from "@/lib/validation/productSchema";

// GET → List all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST → Create new product
export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const data = await request.json();

    // Validación con Yup
    try {
      await productSchema.validate(data, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Errores de validación", errors: err.errors },
        { status: 400 }
      );
    }
    const { name, price, quantity, reference, imageUrl, description } = data;

    // 2. Verificar referencia única
    const existingProduct = await Product.findOne({ reference });
    if (existingProduct) {
      return NextResponse.json(
        { message: "Ya existe un producto con esa referencia" },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json(
        { message: "No se pudo obtener el email del usuario" },
        { status: 500 }
      );
    }

    // 3. Intentar enviar correo antes de guardar
    try {
      await sendEmail({
        to: userEmail || process.env.EMAIL_USER,
        subject: "Nuevo producto agregado",
        html: `
          <h1>Nuevo producto agregado</h1>
          <p>Se agregó un nuevo producto:</p>
          <p><strong>${name}</strong></p>
          <img src="${imageUrl}" width="200" />
        `,
      });
    } catch (error) {
      console.error("Error enviando correo:", error);
      return NextResponse.json(
        { message: "No se pudo enviar el correo" },
        { status: 500 }
      );
    }

    // Si el correo SÍ se envió → guardar producto
    const newProduct = new Product({
      name,
      price,
      quantity,
      reference,
      imageUrl,
      description,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}
