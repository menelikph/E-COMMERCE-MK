import "./styles/globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/app/providers/Providers";
import { I18nProvider } from "./context/I18nContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">
        
        {/* I18N */}
        <I18nProvider>

        {/* PROVIDERS */}
        <Providers>

          {/* NAV */}
          <Navbar />

          {/* CONTENT */}
          <main className="max-w-7xl mx-auto px-6 py-8 min-h-[calc(100vh-160px)]">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />
          
        </Providers>

         </I18nProvider>

      </body>
    </html>
  );
}
