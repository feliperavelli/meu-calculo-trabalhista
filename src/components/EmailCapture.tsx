"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type EmailCaptureProps = {
  salary: string;
  terminationType: string;
  totalValue: number;
};

export function EmailCapture({
  salary,
  terminationType,
  totalValue,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      return;
    }

    try {
     const response = await fetch("/api/send-email",
            {
          method: "POST",
        headers: {
  "Content-Type": "application/json",
},
        body: JSON.stringify({
  email,
  salario: salary,
  tipoRescisao: terminationType,
  valorTotal: totalValue,
}),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert("Erro ao enviar.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar.");
    }
  }

  return (
    <article className="rounded-lg border border-brand-200/90 bg-[linear-gradient(145deg,#ffffff_0%,#f6fbfa_58%,#eef8f5_100%)] p-4 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-800 sm:h-11 sm:w-11">
          <Mail aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>

        <div>
          <h2 className="text-base font-black leading-tight text-ink-950 sm:text-xl">
            Receba o relatório completo da sua rescisão
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-ink-600 sm:mt-2 sm:text-sm sm:leading-6">
            Envie seu email para receber a versão detalhada quando estiver disponível.
          </p>
        </div>
      </div>

      <form
        className="mt-3 grid gap-2.5 sm:mt-5 sm:gap-3"
        onSubmit={handleSubmit}
      >
        <input
          aria-label="Email"
          className="field-control bg-white"
          onChange={(event) => {
            setEmail(event.target.value);
            setSubmitted(false);
          }}
          placeholder="seuemail@exemplo.com"
          type="email"
          value={email}
        />

        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-950 px-4 text-sm font-black text-white shadow-lg shadow-ink-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-brand-900/20 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-brand-200 sm:h-12 sm:px-5"
          type="submit"
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          Enviar Relatório
        </button>
      </form>

      {submitted ? (
        <p className="mt-2 rounded-lg bg-brand-50 px-3 py-2 text-xs font-bold text-brand-800 sm:mt-3 sm:text-sm">
          Pronto. Guardamos seu interesse para o relatório completo.
        </p>
      ) : null}
    </article>
  );
}
