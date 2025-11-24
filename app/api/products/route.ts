import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

//list all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 }); //sort by newest first
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

//POST a new product into the database
export async function POST(request: Request) {
  try {

    await connectDB();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const data = await request.json();
    const { name, price, quantity, reference, imageUrl, description } = data;

    if (!name || !price || !quantity || !reference || !imageUrl) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findOne({ reference }); //check for existing product with same reference
    if (existingProduct) {
      return NextResponse.json(
        { message: "Ya existe un producto con esa referencia" },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name,
      price,
      quantity,
      reference,
      imageUrl,
      description,
    });

    await newProduct.save(); //save the new product to the database

    const resend = new Resend(process.env.RESEND_API_KEY!);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userEmail, 
      subject: "Nuevo producto agregado ✔",
      html: `
        <h1>Nuevo producto agregado</h1>

        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Precio:</strong> $${price}</p>
        <p><strong>Referencia:</strong> ${reference}</p>

        <img src="${imageUrl}" width="180" />

        <p>Mensaje automático.</p>
      `,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}
