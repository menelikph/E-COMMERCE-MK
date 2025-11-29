import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/app/providers/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">

        <Providers>
          {/* NAV */}
          <Navbar />

          {/* CONTENT */}
          <main className="max-w-7xl mx-auto p-6 mt-20">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
