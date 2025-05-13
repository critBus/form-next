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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: 24 }}>Formulario de Lead</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minWidth: 320,
        }}
      >
        <label>
          Email:
          <input
            type="email"
            {...register("email")}
            style={{
              display: "block",
              marginTop: 8,
              marginBottom: 8,
              width: "100%",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
            disabled={isSubmitting}
          />
        </label>
        {errors.email && (
          <div style={{ color: "red", marginBottom: 8 }}>
            {errors.email.message}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: "#0070f3",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>
      {toast && (
        <div
          style={{
            marginTop: 16,
            background: "#4BB543",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
