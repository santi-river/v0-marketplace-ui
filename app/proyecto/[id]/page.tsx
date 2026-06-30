import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProjectPageClient from "./client"
import { projects } from "@/data/projects"

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log("[v0] ProjectPage - ID received:", id)

  const project = projects.find((p) => p.id === Number.parseInt(id))
  console.log("[v0] ProjectPage - Project found:", project ? project.title : "NOT FOUND")

  if (!project) {
    console.log("[v0] ProjectPage - Rendering 404")
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Zona no encontrada</h1>
          <Link href="/">
            <Button>Volver al Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  console.log("[v0] ProjectPage - Rendering ProjectPageClient")
  return <ProjectPageClient project={project} projectId={id} />
}
