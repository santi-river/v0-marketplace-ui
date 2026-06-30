"use client"

import { Check, Download, ArrowRight, Leaf, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

interface Project {
  id: number
  title: string
  price: string
  priceNumber: number
}

export function SuccessContent({ project, quantity }: { project: Project; quantity: number }) {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 2500)
    return () => clearTimeout(t)
  }, [])

  const total = (project.priceNumber * quantity).toFixed(2)
  const cert = `CSE-${String(project.id).padStart(2, "0")}-${new Date().getFullYear()}-${String(quantity).padStart(4, "0")}`

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      {/* bg */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_-10%,#1f5a43_0%,#0c3e2e_48%,#083828_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: "url('/sierras-norte-mountains.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="relative w-full max-w-md">
        {/* Check */}
        <div className="mb-6 flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#f1c766] text-[#083828] shadow-lg">
            <Check className="h-10 w-10" strokeWidth={3} />
            {pulse && <span className="absolute h-20 w-20 animate-ping rounded-full bg-[#f1c766] opacity-30" />}
          </div>
        </div>

        <h1 style={display} className="text-center text-3xl font-extrabold tracking-tight text-white">
          ¡Compra exitosa!
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-center text-[15px] leading-relaxed text-white/75">
          Se acreditaron <span className="font-bold text-[#f1c766]">{quantity} hectárea{quantity > 1 ? "s" : ""}</span> de{" "}
          <span className="font-semibold text-white">{project.title}</span> en tu wallet.
        </p>

        {/* Certificate card */}
        <div className="mt-7 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.07] backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <div className="flex items-center gap-2 text-[#f1c766]">
              <Leaf className="h-4 w-4" />
              <span style={display} className="text-sm font-bold">Certificado de compensación</span>
            </div>
            <span className="rounded-full bg-[#f1c766]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#f1c766]">
              Oficial
            </span>
          </div>
          <div className="space-y-3 px-5 py-5 text-sm">
            <Row label="N° de certificado" value={cert} />
            <Row label="Zona" value={project.title} />
            <Row label="Cantidad" value={`${quantity} ha`} />
            <Row label="Precio unitario" value={project.price} />
            <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-semibold text-white">Total pagado</span>
              <span style={display} className="text-xl font-extrabold text-[#f1c766]">{total} u$</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <Button
            style={display}
            className="h-12 w-full gap-2 rounded-xl bg-[#f1c766] text-base font-bold text-[#083828] hover:bg-[#e8b94e]"
          >
            <Download className="h-4 w-4" />
            Descargar certificado
          </Button>
          <Link href="/" className="block">
            <Button
              variant="outline"
              style={display}
              className="h-12 w-full gap-2 rounded-xl border-white/25 bg-white/5 text-base font-semibold text-white hover:bg-white/10"
            >
              Volver al Marketplace
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/55">
          <ShieldCheck className="h-3.5 w-3.5 text-[#f1c766]" />
          Operación registrada on-chain · Gobierno de la Provincia de Córdoba
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/60">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  )
}
