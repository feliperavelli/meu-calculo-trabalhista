"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

const navItems = [
  { label: "Rescisão", href: "#calculadora" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/95 backdrop-blur-xl">
      <div className="container-page flex min-h-14 items-center justify-between gap-4 sm:min-h-[4.5rem]">
        <a aria-label="Ir para o início" href="#">
          <Logo />
        </a>

        <nav aria-label="Menu principal" className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-semibold text-ink-700 transition hover:text-brand-700"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-white text-ink-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-800 sm:h-10 sm:w-10 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>
      </div>

      {isOpen ? (
        <nav aria-label="Menu mobile" className="border-t border-ink-200 bg-white px-4 py-2 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                className="rounded-lg px-3 py-2 text-sm font-bold text-ink-800 transition hover:bg-brand-50 hover:text-brand-800"
                href={item.href}
                key={item.label}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
