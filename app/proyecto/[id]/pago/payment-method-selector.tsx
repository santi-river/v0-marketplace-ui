"use client"

import { ChevronRight, CreditCard, Smartphone, Building2, Wallet, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

type PaymentMethod = "cordobesa" | "qr" | "debin" | "plataformas" | "credito" | "debito" | "efectivo" | null

interface PaymentMethodSelectorProps {
  projectId: string
  quantity: number
  totalPrice: number
}

export function PaymentMethodSelector({ projectId, quantity, totalPrice }: PaymentMethodSelectorProps) {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)

  console.log("[v0] PaymentMethodSelector mounted")

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    console.log("[v0] Payment method selected:", method)
    setSelectedMethod(method)
  }

  const handlePay = () => {
    console.log("[v0] Navigating to success page")
    router.push(`/proyecto/${projectId}/exito?quantity=${quantity}`)
  }

  return (
    <>
      {/* Featured Payment Methods */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Formas de pago destacadas</h2>
        <div className="space-y-3">
          <button
            onClick={() => handlePaymentMethodSelect("cordobesa")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "cordobesa" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Cordobesa</div>
                <div className="text-sm text-muted-foreground">1 pago o 6 cuotas sin interés</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => handlePaymentMethodSelect("qr")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "qr" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">QR</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => handlePaymentMethodSelect("debin")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "debin" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">DEBIN</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Other Payment Methods */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Otras formas de pago</h2>
        <div className="space-y-3">
          <button
            onClick={() => handlePaymentMethodSelect("plataformas")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "plataformas" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Wallet className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Plataformas de pago</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => handlePaymentMethodSelect("credito")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "credito" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Tarjeta de crédito</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => handlePaymentMethodSelect("debito")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "debito" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Tarjeta de débito</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => handlePaymentMethodSelect("efectivo")}
            className={`w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-accent transition-colors ${
              selectedMethod === "efectivo" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Banknote className="h-5 w-5 text-foreground" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Efectivo</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Pay Button - Only shown when payment method is selected */}
      {selectedMethod && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
          <div className="mx-auto max-w-2xl">
            <Button
              onClick={handlePay}
              className="w-full h-12 text-base hover:bg-primary/90 text-primary-foreground bg-primary"
            >
              Pagar ${totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
