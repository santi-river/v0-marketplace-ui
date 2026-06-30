"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ArrowRight } from "lucide-react"
import type { Zone } from "@/data/projects"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

export function PurchaseForm({ project, projectId }: { project: Zone; projectId: string }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const handlePurchase = () => {
    router.push(`/proyecto/${projectId}/pago?quantity=${quantity}`)
  }

  const totalPrice = project.priceNumber * quantity

  return (
    <div className="rounded-2xl border border-[#e6ece8] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,53,39,0.4)]">
      <h2 style={display} className="mb-5 text-xl font-bold text-[#16221c]">
        Comprar hectáreas
      </h2>

      {/* Quantity */}
      <label className="mb-3 block text-sm font-semibold text-[#16221c]">Cantidad (hectáreas)</label>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          className="h-11 w-11 rounded-xl border-[#d4ddd7] bg-white"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="flex-1 text-center">
          <div style={display} className="text-3xl font-extrabold text-[#16221c]">{quantity}</div>
          <div className="mt-0.5 text-xs text-[#5c6b63]">hectáreas</div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity((q) => Math.min(project.availableNumber, q + 1))}
          disabled={quantity >= project.availableNumber}
          className="h-11 w-11 rounded-xl border-[#d4ddd7] bg-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-3 text-center text-xs text-[#9aa8a0]">
        Máximo disponible: {project.availableNumber.toLocaleString("es-AR")} hectáreas
      </div>

      {/* Summary */}
      <div className="mt-6 space-y-2 rounded-2xl bg-[#f4f7f4] p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#5c6b63]">Precio por hectárea</span>
          <span className="font-medium text-[#16221c]">{project.price}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#5c6b63]">Cantidad</span>
          <span className="font-medium text-[#16221c]">{quantity} ha</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-[#e0e6e2] pt-2">
          <span className="text-base font-bold text-[#16221c]">Total</span>
          <span style={display} className="text-2xl font-extrabold text-[#16553f]">{totalPrice.toFixed(2)} u$</span>
        </div>
      </div>

      <Button
        onClick={handlePurchase}
        style={display}
        className="mt-6 h-12 w-full gap-2 rounded-xl bg-[#16553f] text-base font-bold text-white hover:bg-[#114433]"
      >
        Comprar {quantity} hectárea{quantity > 1 ? "s" : ""}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="mt-3 text-center text-xs text-[#9aa8a0]">
        Al continuar, aceptás los términos y condiciones del marketplace.
      </p>
    </div>
  )
}
