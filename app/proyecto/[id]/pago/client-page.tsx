"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PaymentMethodSelector } from "./payment-method-selector"

type PaymentMethod = "cordobesa" | "qr" | "debin" | "plataformas" | "credito" | "debito" | "efectivo" | null

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
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-2xl px-6 py-8">
        {/* Back Button */}
        <Link href={`/proyecto/${projectId}`}>
          <Button variant="ghost" className="mb-6 gap-2 text-foreground hover:bg-background">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        {/* Payment Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-4">¿Cómo querés pagar?</h1>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-foreground">${totalPrice.toFixed(2)}</span>
          </div>
          
        </div>

        <PaymentMethodSelector projectId={projectId} quantity={quantity} totalPrice={totalPrice} />
      </div>
    </div>
  )
}
