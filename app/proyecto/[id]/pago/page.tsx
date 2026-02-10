import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projects } from "@/data/projects"
import PaymentClientPage from "./client-page"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function PaymentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ quantity?: string }>
}) {
  const { id } = await params
  const { quantity: quantityParam } = await searchParams

  console.log("[v0] PaymentPage - ID received:", id)
  console.log("[v0] PaymentPage - Quantity received:", quantityParam)

  const project = projects.find((p) => p.id === Number.parseInt(id))
  const quantity = Number.parseInt(quantityParam || "1")

  if (!project) {
    console.log("[v0] PaymentPage - Project not found")
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

  console.log("[v0] PaymentPage - Project found:", project.title)
  console.log("[v0] PaymentPage - Total price:", project.priceNumber * quantity)

  const totalPrice = project.priceNumber * quantity

  return <PaymentClientPage projectId={id} quantity={quantity} totalPrice={totalPrice} projectTitle={project.title} />
}
