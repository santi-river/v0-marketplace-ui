"use client"

import { Bell, MapPin, ArrowLeft, LucideRefreshCcwDot as LucideRefreshCcwDotIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { PurchaseForm } from "./purchase-form"
import { useEffect } from "react"

export default function ProjectPageClient({ project, projectId }: { project: any; projectId: string }) {
  useEffect(() => {
    console.log("[v0] ProjectPageClient mounted with project:", project.title)
  }, [project])

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link href="/">
                <Image src="/cordoba-logo.png" alt="Córdoba" width={200} height={60} className="h-12 w-auto" />
              </Link>
              <Image
                src="/ministerio-ambiente-logo.png"
                alt="Ministerio de Ambiente y Economía Circular"
                width={220}
                height={60}
                className="h-14 w-auto"
              />
              <Image
                src="/cambio-climatico-logo.png"
                alt="Secretaría de Cambio Climático"
                width={180}
                height={50}
                className="h-10 w-auto"
              />
              <Image
                src="/ecosystem-services-icons.png"
                alt="Servicios Ecosistémicos: Agua, Biodiversidad, CO2"
                width={400}
                height={80}
                className="h-16 w-auto"
              />
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-4">
              <button className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                  1
                </span>
              </button>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">EM</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-sm font-medium text-foreground">Empresa SA</div>
                  <div className="text-xs text-muted-foreground">27-56232</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Exchange Rate Block */}
      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-2">
          <div className="flex justify-end">
            <div className="flex items-center gap-2 text-sm">
              <LucideRefreshCcwDotIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cotización del dia</span>
              <span className="font-semibold text-foreground">1,00 u$ = $1.500,00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8 border-none">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2 bg-sky-200">
            <ArrowLeft className="h-4 w-4" />
            Volver al Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Project Image and Details */}
          <div className="space-y-6">
            {/* Project Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-background text-foreground text-sm font-medium rounded-full">
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Project Info */}
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-3">{project.title}</h1>
              <div className="flex items-center gap-2 text-base text-muted-foreground mb-4">
                <MapPin className="h-5 w-5" />
                <span>{project.location}</span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex px-4 py-2 text-sm font-medium rounded-full bg-[rgba(0,170,227,0.507608703944994)] text-foreground">
                  {project.ambiente}
                </span>
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Disponible</div>
                <div className="text-lg font-semibold text-foreground">{project.available}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Precio por Hectárea</div>
                <div className="text-lg font-semibold text-foreground">{project.price}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Año</div>
                <div className="text-lg font-medium text-foreground">{project.year}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Form */}
          <PurchaseForm project={project} projectId={projectId} />
        </div>
      </main>
    </div>
  )
}
