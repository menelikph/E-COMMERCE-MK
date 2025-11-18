import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

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

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}
