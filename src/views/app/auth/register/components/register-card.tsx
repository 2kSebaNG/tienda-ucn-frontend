import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { RegisterForm } from "./register-form";

export function RegisterCard() {
  return (
    <Card className="w-full max-w-4xl mb-6">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Regístrate</CardTitle>
        <CardDescription>
          Ingresa tus datos para crear una cuenta y comenzar a usar el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
