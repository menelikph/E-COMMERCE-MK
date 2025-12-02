/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendEmail } from "@/lib/nodemailer";
import { productSchema } from "@/lib/validation/productSchema";


// ================================
// GET → List products with pagination + filters
// ================================
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 8;

    const search = searchParams.get("search") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const query: any = {};

    // Search filter → by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Price filters → minPrice
    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }

    // Price filters → maxPrice
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// ================================
// POST → Create a new product
// ================================
export async function POST(request: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const data = await request.json();

    // Yup validation
    try {
      await productSchema.validate(data, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { message: "Validation errors", errors: err.errors },
        { status: 400 }
      );
    }

    const { name, price, quantity, reference, imageUrl, description } = data;

    // Unique reference check
    const existingProduct = await Product.findOne({ reference });
    if (existingProduct) {
      return NextResponse.json(
        { message: "A product with this reference already exists" },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json(
        { message: "User email could not be retrieved" },
        { status: 500 }
      );
    }

    // Try to send email first
    try {
      await sendEmail({
        to: userEmail || process.env.EMAIL_USER,
        subject: "New product added",
        html: `
          <h1>New product added</h1>
          <p>A new product has been added:</p>
          <p><strong>${name}</strong></p>
          <img src="${imageUrl}" width="200" />
        `,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }

    // Save only if email succeeded
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
