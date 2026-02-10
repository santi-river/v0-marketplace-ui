"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

type Project = {
  id: number
  badge: string
  title: string
  location: string
  available: string
  availableNumber: number
  price: string
  priceNumber: number
  year: string
  ambiente: string
  image: string
}

export function PurchaseForm({ project, projectId }: { project: Project; projectId: string }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    console.log("[v0] PurchaseForm mounted for project:", project.title)
  }, [project])

  const handleIncreaseQuantity = () => {
    if (quantity < project.availableNumber) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handlePurchase = () => {
    console.log("[v0] PurchaseForm - Navigating to payment with quantity:", quantity)
    router.push(`/proyecto/${projectId}/pago?quantity=${quantity}`)
  }

  const totalPrice = project.priceNumber * quantity

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-foreground mb-4">Comprar Hectáreas</h2>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-3 block">Cantidad (Hectáreas)</label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              className="h-10 w-10 bg-transparent"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-3xl font-semibold text-foreground">{quantity}</div>
              <div className="text-xs text-muted-foreground mt-1">Hectáreas</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncreaseQuantity}
              disabled={quantity >= project.availableNumber}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-3 text-center text-xs text-muted-foreground">
            Máximo disponible: {project.availableNumber} Hectáreas
          </div>
        </div>

        {/* Price Summary */}
        <div className="p-4 bg-muted rounded-lg space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Precio por hectárea</span>
            <span className="font-medium text-foreground">{project.price}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cantidad</span>
            <span className="font-medium text-foreground">{quantity} Hectáreas</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <Button
          onClick={handlePurchase}
          className="w-full h-12 text-base hover:bg-primary/90 text-primary-foreground bg-[rgba(0,170,226,1)]"
        >
          Comprar {quantity} Hectárea{quantity > 1 ? "s" : ""}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          Al hacer clic en "Comprar", aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  )
}
