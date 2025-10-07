import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RegisterForm } from "./register-form";

export function RegisterCard() {
  return (
    <Card className="w-full max-w-xl h-[600px]">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Regístrate</CardTitle>
        <CardDescription>
          Ingresa tus datos para crear una cuenta y comenzar a usar el sistema.
        </CardDescription>
        <CardAction>
          <Button asChild variant="link" size="sm">
            <Link href="/auth/login">Inicia Sesión</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
