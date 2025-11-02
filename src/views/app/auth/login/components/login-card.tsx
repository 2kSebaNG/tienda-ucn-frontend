import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { LoginForm } from "./login-form";

export function LoginCard() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y contraseña para acceder a tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
