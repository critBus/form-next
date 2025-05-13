"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Email inválido"),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [toast, setToast] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setToast("¡Lead enviado con éxito!");
    // Evento GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lead_submit", {
        email: data.email,
      });
    }
    reset();
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] text-black">
      <h1 className="text-2xl mb-6">Formulario de Lead</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md min-w-[320px]"
      >
        <label className="block">
          Email:
          <input
            type="email"
            {...register("email")}
            className="block mt-2 mb-2 w-full p-2 rounded border border-gray-300 disabled:bg-gray-100"
            disabled={isSubmitting}
          />
        </label>
        {errors.email && (
          <div className="text-red-600 mb-2">{errors.email.message}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white border-none px-5 py-2 rounded cursor-pointer disabled:opacity-60"
        >
          Enviar
        </button>
      </form>
      {toast && (
        <div className="mt-4 bg-green-600 text-white px-5 py-2 rounded shadow-md">
          {toast}
        </div>
      )}
    </div>
  );
}
