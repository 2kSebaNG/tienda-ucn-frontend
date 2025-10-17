"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomeView() {
  const { data } = useSession();
  const role = data?.user.role;

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="relative min-h-screen w-full">
        <Image
          src="/retail-shopping-covid19.webp"
          alt="Background"
          fill
          className="object-cover"
          quality={95}
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white min-h-screen text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Bienvenido a Tienda UCN
          </h1>

          <p className="text-lg sm:text-xl mb-8">
            Tu tienda oficial de la Universidad Católica del Norte
          </p>

          <Link
            href={
              role?.toLowerCase() === "admin" ? "/admin/products" : "/products"
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Explorar Productos
          </Link>
        </div>
      </div>
    </section>
  );
}
