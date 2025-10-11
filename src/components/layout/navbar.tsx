"use client";

import { ChevronDownIcon, EditIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useLogoutMutation } from "@/hooks/api";

export const Navbar = () => {
  // Hooks
  const { mutateAsync: logoutAsync, isPending: isLoggingOut } =
    useLogoutMutation();
  const { status } = useSession();

  // Computed values
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  // Navigation items
  const navigationItems = [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Productos" },
  ];

  // Event handlers
  const handleLogout = async () => {
    await logoutAsync();
  };

  return (
    <header className="bg-blue-800 text-white h-16">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 h-full">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl cursor-pointer">
          IDWM
        </Link>

        {/* Navigation */}
        <div className="flex flex-1 justify-between items-center ml-8">
          <ul className="flex space-x-8 font-medium">
            {navigationItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-gray-200 transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex space-x-4 font-medium items-center">
            {isLoading ? (
              <></>
            ) : isAuthenticated ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="relative flex items-center bg-blue-600 hover:bg-blue-700 rounded-full p-2 px-4 transition cursor-pointer">
                      <UserIcon className="h-5 w-5 mr-2" />
                      Mi cuenta
                      <ChevronDownIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="flex items-center cursor-pointer"
                      >
                        <EditIcon className="h-4 w-4 mr-2" />
                        Editar perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 transition-colors cursor-pointer"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/register"
                    className="bg-transparent hover:bg-transparent text-white hover:text-gray-200 rounded-full px-4 py-2 transition-colors cursor-pointer"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
