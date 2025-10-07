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

import { LoginForm } from "./login-form";

interface Props {
  email?: string;
}

export function LoginCard({ email }: Props) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y contraseña para acceder a tu cuenta.
        </CardDescription>
        <CardAction>
          <Button asChild variant="link" size="sm">
            <Link href="/auth/register">Regístrate</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <LoginForm email={email} />
      </CardContent>
    </Card>
  );
}
