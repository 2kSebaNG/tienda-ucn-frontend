import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { VerifyEmailForm } from "./verify-email-form";

interface Props {
  email?: string;
}

export function VerifyEmailCard({ email }: Props) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Verifica tu cuenta</CardTitle>
        <CardDescription>
          Ingresa tu código único de verificación
        </CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>
        <VerifyEmailForm email={email} />
      </CardContent>
    </Card>
  );
}
