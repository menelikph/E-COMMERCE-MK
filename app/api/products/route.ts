import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendEmail } from "@/lib/nodemailer";

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

    if (!newProduct) {
      return NextResponse.json(
        { message: "Error creating product" },
        { status: 500 }
      );
    } else if (!userEmail) {
      return NextResponse.json(
        { message: "No se pudo obtener el email del usuario" },
        { status: 500 }
      );
    }

    await newProduct.save();

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

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}
