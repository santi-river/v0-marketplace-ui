"use client"

import { ChevronRight, CreditCard, Smartphone, Building2, Wallet, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

type PaymentMethod =
  | "cordobesa" | "qr" | "debin" | "plataformas" | "credito" | "debito" | "efectivo" | null

interface PaymentMethodSelectorProps {
  projectId: string
  quantity: number
  totalPrice: number
}

const featured = [
  { id: "cordobesa", icon: Wallet, label: "Cordobesa", desc: "1 pago o 6 cuotas sin interés" },
  { id: "qr", icon: Smartphone, label: "QR", desc: "Escaneá y pagá al instante" },
  { id: "debin", icon: Building2, label: "DEBIN", desc: "Débito inmediato desde tu cuenta" },
] as const

const others = [
  { id: "plataformas", icon: Wallet, label: "Plataformas de pago" },
  { id: "credito", icon: CreditCard, label: "Tarjeta de crédito" },
  { id: "debito", icon: CreditCard, label: "Tarjeta de débito" },
  { id: "efectivo", icon: Banknote, label: "Efectivo" },
] as const

export function PaymentMethodSelector({ projectId, quantity, totalPrice }: PaymentMethodSelectorProps) {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)

  const handlePay = () => {
    router.push(`/proyecto/${projectId}/exito?quantity=${quantity}`)
  }

  const rowClass = (active: boolean) =>
    `w-full flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 text-left transition-all ${
      active ? "border-[#16553f] ring-2 ring-[#16553f]/15" : "border-[#e6ece8] hover:border-[#cdd9d2] hover:bg-[#fafcfb]"
    }`

  return (
    <>
      {/* Featured */}
      <h2 style={display} className="mb-3 text-sm font-bold uppercase tracking-wide text-[#5c6b63]">
        Formas de pago destacadas
      </h2>
      <div className="space-y-3">
        {featured.map((m) => {
          const active = selectedMethod === m.id
          return (
            <button key={m.id} onClick={() => setSelectedMethod(m.id)} className={rowClass(active)}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "bg-[#16553f] text-white" : "bg-[#eaf0ec] text-[#16553f]"}`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[#16221c]">{m.label}</div>
                  <div className="text-sm text-[#5c6b63]">{m.desc}</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#9aa8a0]" />
            </button>
          )
        })}
      </div>

      {/* Others */}
      <h2 style={display} className="mb-3 mt-8 text-sm font-bold uppercase tracking-wide text-[#5c6b63]">
        Otras formas de pago
      </h2>
      <div className="space-y-3">
        {others.map((m) => {
          const active = selectedMethod === m.id
          return (
            <button key={m.id} onClick={() => setSelectedMethod(m.id)} className={rowClass(active)}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "bg-[#16553f] text-white" : "bg-[#f4f7f4] text-[#16221c]"}`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold text-[#16221c]">{m.label}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#9aa8a0]" />
            </button>
          )
        })}
      </div>

      {/* Pay button */}
      {selectedMethod && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e6ece8] bg-white/95 p-4 backdrop-blur">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={handlePay}
              style={display}
              className="h-12 w-full rounded-xl bg-[#16553f] text-base font-bold text-white hover:bg-[#114433]"
            >
              Pagar {totalPrice.toFixed(2)} u$
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
