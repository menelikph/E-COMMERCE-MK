"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (

    <div className="pb-20">
      {/* WELCOME SECTION */}
      <section className="w-full py-45 text-center select-none">
        <h1 className="text-8xl md:text-8xl m-3 font-extrabold bg-gradient-to-r from-purple-500 to-blue-100 bg-clip-text text-transparent animate-fade-in">
          Welcome to MStore
        </h1>

        <Link href="/products">
          <Button
            className="m-2.5 px-8 py-6 text-xl font-semibold 
               bg-gradient-to-r from-purple-500 to-blue-500 
               text-white rounded-2xl shadow-lg
               hover:scale-105 hover:shadow-purple-500/20
               transition-all duration-300"
          >
            Products
          </Button>
        </Link>

      </section>
      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 my-20">
        <Card shadow="sm" className="bg-gray-900 border border-gray-700">
          <CardBody className="flex items-center gap-4">
            <Truck size={32} className="text-purple-400" />
            <div>
              <h3 className="text-white">Fast Shipping</h3>
              <p className="text-gray-400 text-sm">Receive your order in record time.</p>
            </div>
          </CardBody>
        </Card>

        <Card shadow="sm" className="bg-gray-900 border border-gray-700">
          <CardBody className="flex items-center gap-4">
            <ShieldCheck size={32} className="text-purple-400" />
            <div>
              <h3 className="text-white">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Pay safely with trusted gateways.</p>
            </div>
          </CardBody>
        </Card>

        <Card shadow="sm" className="bg-gray-900 border border-gray-700">
          <CardBody className="flex items-center gap-4">
            <Sparkles size={32} className="text-purple-400" />
            <div>
              <h3 className="text-white">Premium Quality</h3>
              <p className="text-gray-400 text-sm">Only top-quality curated items.</p>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
