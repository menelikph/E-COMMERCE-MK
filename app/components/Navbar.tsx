"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
      <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-purple-900 shadow-md  border-gray-800 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center transition-all duration-300">
        <Link
          href="/"
          className={`text-2xl font-extrabold tracking-wide ${
            scrolled ? "text-purple-400" : "text-purple-500"
          }`}
        >
          Menelik<span className="text-white">Store</span>
        </Link>
{/* 🍔 Botón hamburguesa */}
<button
  className="md:hidden flex flex-col justify-center items-center focus:outline-none z-[60]"
  onClick={toggleMenu}
  aria-label="Toggle menu"
>
  <motion.span
    animate={{
      rotate: isOpen ? 45 : 0,
      y: isOpen ? 6 : 0,
    }}
    className={`block w-6 h-0.5 mb-1 transition-colors duration-300 ${
      scrolled ? "bg-white" : "bg-purple-700"
    }`}
  />
  <motion.span
    animate={{
      opacity: isOpen ? 0 : 1,
    }}
    className={`block w-6 h-0.5 mb-1 transition-colors duration-300 ${
      scrolled ? "bg-white" : "bg-purple-900"
    }`}
  />
  <motion.span
    animate={{
      rotate: isOpen ? -45 : 0,
      y: isOpen ? -6 : 0,
    }}
    className={`block w-6 h-0.5 transition-colors duration-300 ${
      scrolled ? "bg-white" : "bg-purple-500"
    }`}
  />
</button>



        <ul className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
          <li>
            <Link href="/" className="text-gray-300 hover:text-purple-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-300 hover:text-purple-400 transition">
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-300 hover:text-purple-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition">
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-md transition"
          >
            Login
          </Link>
        </div>
      </nav>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)} 
          >
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-full border-gray-700 z-50"
              onClick={(e) => e.stopPropagation()} 
            >
              <ul className="flex flex-col text-center py-4 space-y-2 text-gray-300 uppercase text-sm">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-purple-400 transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-purple-400 transition"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-purple-400 transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-purple-400 transition"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="inline-block px-4 py-2 bg-purple-500 text-white rounded-md mt-2 hover:bg-purple-600 transition"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
