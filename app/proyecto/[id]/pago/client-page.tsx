"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { PaymentMethodSelector } from "./payment-method-selector"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

export default function PaymentClientPage({
  projectId,
  quantity,
  totalPrice,
  projectTitle,
}: {
  projectId: string
  quantity: number
  totalPrice: number
  projectTitle: string
}) {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <SiteHeader />

      <div className="mx-auto max-w-2xl px-6 py-8 pb-28">
        {/* Back */}
        <Link href={`/proyecto/${projectId}`}>
          <Button variant="ghost" className="mb-6 gap-2 rounded-xl text-[#16553f] hover:bg-[#eaf0ec]">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        {/* Header + total */}
        <h1 style={display} className="text-2xl font-extrabold text-[#16221c]">
          ¿Cómo querés pagar?
        </h1>

        {/* Order summary */}
        <div className="mt-5 rounded-2xl border border-[#e6ece8] bg-white p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5c6b63]">Zona</span>
            <span className="font-semibold text-[#16221c]">{projectTitle}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-[#5c6b63]">Cantidad</span>
            <span className="font-semibold text-[#16221c]">{quantity} ha</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#e0e6e2] pt-3">
            <span className="text-base font-bold text-[#16221c]">Total a pagar</span>
            <span style={display} className="text-3xl font-extrabold text-[#16553f]">
              {totalPrice.toFixed(2)} u$
            </span>
          </div>
        </div>

        <div className="mt-8">
          <PaymentMethodSelector projectId={projectId} quantity={quantity} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  )
}
