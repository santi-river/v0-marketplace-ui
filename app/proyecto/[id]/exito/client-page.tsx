"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SuccessContent } from "./success-content"

const projects = [
  {
    id: 1,
    badge: "RDU2",
    title: "Bañados de Rio Dulce",
    location: "Mar chiquita • Córdoba",
    available: "2.000 Hectareas",
    availableNumber: 2000,
    price: "$100,00",
    priceNumber: 100,
    year: "2025",
    ambiente: "Ambiente",
    image: "/wetland-marsh-landscape.jpg",
  },
  {
    id: 2,
    badge: "BCH2",
    title: "Bolson chaqueño",
    location: "Noroeste • Córdoba",
    available: "1.000 Hectareas",
    availableNumber: 1000,
    price: "$110,00",
    priceNumber: 110,
    year: "2025",
    ambiente: "Ambiente",
    image: "/chaco-forest-trees-landscape.jpg",
  },
  {
    id: 3,
    badge: "PAL2",
    title: "Pampas de Altura",
    location: "Sierras pampeanas • Córdoba",
    available: "5.000 Hectareas",
    availableNumber: 5000,
    price: "$100,00",
    priceNumber: 100,
    year: "2025",
    ambiente: "Ambiente",
    image: "/pampas-altura-new.png",
  },
  {
    id: 4,
    badge: "PME2",
    title: "Pampas medanosa",
    location: "Sudoeste • Córdoba",
    available: "1.500 Hectareas",
    availableNumber: 1500,
    price: "$75,00",
    priceNumber: 75,
    year: "2025",
    ambiente: "Ambiente",
    image: "/pampas-medanosa-dunes.png",
  },
  {
    id: 5,
    badge: "SNO2",
    title: "Sierras del norte",
    location: "Norte • Córdoba",
    available: "1.800 Hectareas",
    availableNumber: 1800,
    price: "$120,00",
    priceNumber: 120,
    year: "2025",
    ambiente: "Ambiente",
    image: "/sierras-norte-mountains.jpg",
  },
  {
    id: 6,
    badge: "VIN2",
    title: "Valles Intermontanos",
    location: "Punilla • Córdoba",
    available: "1.000 Hectareas",
    availableNumber: 1000,
    price: "$160,00",
    priceNumber: 160,
    year: "2025",
    ambiente: "Ambiente",
    image: "/valles-intermontanos-river.png",
  },
]

export default function ClientSuccessPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { quantity?: string }
}) {
  const { id } = params
  const { quantity: quantityParam } = searchParams

  console.log("[v0] SuccessPage - ID received:", id)

  const project = projects.find((p) => p.id === Number.parseInt(id))
  const quantity = Number.parseInt(quantityParam || "1")

  if (!project) {
    console.log("[v0] SuccessPage - Project not found")
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Proyecto no encontrado</h1>
          <Link href="/">
            <Button>Volver al Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  console.log("[v0] SuccessPage - Project found:", project.title)

  return <SuccessContent project={project} quantity={quantity} />
}
