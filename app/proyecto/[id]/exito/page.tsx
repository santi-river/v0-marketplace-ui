import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SuccessContent } from "./success-content"
import { projects } from "@/data/projects"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ quantity?: string }>
}) {
  const { id } = await params
  const { quantity: quantityParam } = await searchParams

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
