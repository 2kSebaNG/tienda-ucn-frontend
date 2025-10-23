"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";

import { useNewProduct } from "../hooks";
import { ImageInput } from "./image-input";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { error: "El título debe tener al menos 3 caracteres" })
    .max(20, { error: "El título debe tener como máximo 50 caracteres" }),
  description: z
    .string()
    .min(10, { error: "La descripción debe tener al menos 10 caracteres" })
    .max(100, {
      error: "La descripción debe tener como máximo 100 caracteres",
    }),
  price: z.coerce
    .number()
    .int({ error: "El precio debe ser un número entero" })
    .gte(0, { error: "El precio no puede ser menor a 0" }),
  stock: z.coerce
    .number()
    .int({ error: "El stock debe ser un número entero" })
    .gte(0, { error: "El stock no puede ser menor a 0" }),
  status: z.enum(["New", "Used"], { error: "Seleccione un estado válido" }),
  categoryName: z
    .string()
    .min(3, { error: "La categoría debe tener al menos 3 caracteres" })
    .max(50, { error: "La categoría debe tener como máximo 50 caracteres" }),
  brandName: z
    .string()
    .min(3, { error: "La marca debe tener al menos 3 caracteres" })
    .max(50, { error: "La marca debe tener como máximo 50 caracteres" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { error: "Debes subir al menos una imagen" })
    .refine(files => files.every(file => file.size <= 5_242_880), {
      error: "Una o más imágenes superan el peso máximo de 5 MB",
    })
    .refine(
      files =>
        files.every(file =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type
          )
        ),
      { error: "Solo se admiten imágenes JPG, JPEG, PNG y WEBP" }
    ),
});

export function NewProductForm() {
  const {
    isLoading,
    actions: { handleCreateProduct },
  } = useNewProduct();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      status: undefined,
      categoryName: "",
      brandName: "",
      images: [] as File[],
    },
    mode: "onTouched",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleCreateProduct(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pantalón de tela"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Pantalón muy bueno..."
                      rows={4}
                      maxLength={100}
                      disabled={isLoading}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                const { value, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        value={value as number}
                        {...rest}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => {
                const { value, ...rest } = field;
                return (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        value={value as number}
                        {...rest}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger
                        className={`w-full ${fieldState.error ? "border-destructive" : ""} `}
                        onBlur={field.onBlur}
                      >
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">Nuevo</SelectItem>
                        <SelectItem value="Used">Usado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="Ropa" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Nike" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Imágenes</FormLabel>
              <FormControl>
                <ImageInput
                  {...field}
                  value={field.value ?? []}
                  disabled={isLoading}
                  className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  error={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-4 flex justify-center mt-4">
          <Button
            type="submit"
            className={`w-full ${isLoading ? "cursor-wait" : "cursor-pointer"}`}
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? "Creando producto..." : "Crear producto"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
