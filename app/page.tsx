"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Truck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useI18n } from "./context/I18nContext";



/**
 * Home component renders the main landing page with a welcome message and key features.
 */
export default function Home() {
  const { t } = useI18n(); 

  return (
    <div className="pb-20">
      {/* WELCOME SECTION: Main header and CTA button */}
      <section className="w-full py-45 text-center select-none">
        <h1 className="text-8xl md:text-8xl m-3 font-extrabold bg-gradient-to-r from-purple-500 to-blue-100 bg-clip-text text-transparent animate-fade-in">
          {t("home.welcome_title")}
        </h1>

        <Link href="/products">
          <Button
            className="m-2.5 px-8 py-6 text-xl font-semibold 
               bg-gradient-to-r from-purple-500 to-blue-500 
               text-white rounded-2xl shadow-lg
               hover:scale-105 hover:shadow-purple-500/20
               transition-all duration-300 mt-10"
          >
            {t("home.products_button")}
          </Button>
        </Link>
      </section>
      
      {/* FEATURES SECTION: Highlight three key differentiators */}
      <section className="max-w-6xl text-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 my-20">
        
        {/* Feature 1: Fast Shipping */}
        <Card shadow="sm" className="bg-gray-900 border border-gray-700">
          <CardBody className="flex items-center gap-4">
            <Truck size={32} className="text-purple-400" />
            <div className="text-center">
              <h3 className="text-white">{t("features.shipping_title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.shipping_description")}</p>
            </div>
          </CardBody>
        </Card>

        {/* Feature 2: Secure Payments */}
        <Card shadow="sm" className="bg-gray-900 border border-gray-700">
          <CardBody className="flex items-center gap-4">
            <ShieldCheck size={32} className="text-purple-400" />
            <div className="text-center">
              <h3 className="text-white">{t("features.security_title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.security_description")}</p>
            </div>
          </CardBody>
        </Card>

        {/* Feature 3: Premium Quality */}
        <Card shadow="sm" className="bg-gray-900 border border-gray-700">
          <CardBody className="flex items-center gap-4">
            <Sparkles size={32} className="text-purple-400" />
            <div className="text-center">
              <h3 className="text-white">{t("features.quality_title")}</h3>
              <p className="text-gray-400 text-sm">{t("features.quality_description")}</p>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}