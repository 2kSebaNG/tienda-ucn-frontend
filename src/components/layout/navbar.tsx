"use client";

import Link from "next/link";
import { useState } from "react";
import { UserIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="font-bold text-2xl">IDWM</div>

        <ul className="hidden md:flex space-x-8 font-medium items-center">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/products">Productos</Link>
          </li>
          <li>
            <Link href="/services">Servicios</Link>
          </li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
              <UserIcon /> Iniciar sesión
            </Button>
          </Link>
          <li>
            <Link
              href={"/cart"}
              className="relative flex items-center hover:bg-blue-400 rounded-full p-2 transition-all"
            ></Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-950 text-white space-y-4 py-4">
          <ul className="text-center space-y-2">
            <li>
              <Link href="/" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={toggleMenu}>
                Productos
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={toggleMenu}>
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu}>
                Contacto
              </Link>
            </li>
          </ul>
          <Link
            href="/login"
            className="w-full flex items-center justify-center px-7"
          >
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full">
              <UserIcon /> Iniciar sesión
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
