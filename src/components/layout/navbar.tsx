"use client";

import {
  ChevronDownIcon,
  EditIcon,
  LogOutIcon,
  PackageIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
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

import { CartDropdown } from "./cart-dropdown";

export const Navbar = () => {
  // Hooks
  const { mutateAsync: logoutAsync, isPending: isLoggingOut } =
    useLogoutMutation();
  const { status, data } = useSession();

  // Computed values
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const role = data?.user.role;
  const isAdmin = role?.toLowerCase() === "admin";

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
          <ul className="flex space-x-8 font-medium items-center">
            <li>
              <Link
                href="/"
                className="hover:text-gray-200 transition-colors cursor-pointer"
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="hover:text-gray-200 transition-colors cursor-pointer"
              >
                Productos
              </Link>
            </li>

            {isAdmin && (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center hover:text-gray-200 transition-colors cursor-pointer">
                      Administración
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/products"
                        className="flex items-center cursor-pointer"
                      >
                        <PackageIcon className="h-4 w-4 mr-2" />
                        Productos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/users"
                        className="flex items-center cursor-pointer"
                      >
                        <UsersIcon className="h-4 w-4 mr-2" />
                        Usuarios
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>

          <ul className="flex space-x-4 font-medium items-center">
            <li>
              <CartDropdown />
            </li>

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
                    {!isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/orders"
                          className="flex items-center cursor-pointer"
                        >
                          <PackageIcon className="h-4 w-4 mr-2" />
                          Mis órdenes
                        </Link>
                      </DropdownMenuItem>
                    )}
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
