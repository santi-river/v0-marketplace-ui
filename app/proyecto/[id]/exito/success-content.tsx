"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Project {
  id: number
  title: string
  price: string
  priceNumber: number
}

interface SuccessContentProps {
  project: Project
  quantity: number
}

export function SuccessContent({ project, quantity }: SuccessContentProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  console.log("[v0] SuccessContent mounted")

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <CheckCircle2 className="h-24 w-24 text-green-500" />
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-ping absolute h-24 w-24 rounded-full bg-green-500 opacity-20"></div>
              </div>
            )}
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-foreground mb-4">¡Compra exitosa!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Se han enviado{" "}
          <span className="font-semibold text-foreground">
            {quantity} hectárea{quantity > 1 ? "s" : ""}
          </span>{" "}
          de <span className="font-semibold text-foreground">{project.title}</span> a tu Wallet
        </p>

        {/* Transaction Details */}
        <div className="bg-muted rounded-lg p-6 mb-8 text-left">
          <h2 className="text-sm font-semibold text-foreground mb-4">Detalles de la transacción</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Proyecto</span>
              <span className="font-medium text-foreground">{project.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cantidad</span>
              <span className="font-medium text-foreground">{quantity} Hts</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Precio unitario</span>
              <span className="font-medium text-foreground">{project.price}</span>
            </div>
            <div className="border-t border-border pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-foreground">Total pagado</span>
                <span className="text-lg font-bold text-foreground">
                  ${(project.priceNumber * quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              Volver al Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
