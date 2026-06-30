"use client"

import { MapPin, ArrowLeft, Leaf, Droplets, Bird, Cloud, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PurchaseForm } from "./purchase-form"
import { SiteHeader } from "@/components/site-header"
import type { Zone } from "@/data/projects"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

const serviceIcon: Record<string, any> = { Agua: Droplets, Biodiversidad: Bird, "CO₂": Cloud }

export default function ProjectPageClient({ project, projectId }: { project: Zone; projectId: string }) {
  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Back */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 gap-2 rounded-xl text-[#16553f] hover:bg-[#eaf0ec]">
            <ArrowLeft className="h-4 w-4" />
            Volver al Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div className="relative h-80 overflow-hidden rounded-2xl md:h-96">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083828]/55 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-bold text-[#16553f] shadow-sm">
                {project.badge}
              </span>
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#083828]/70 px-3 py-1.5 text-xs font-medium text-[#f1c766] backdrop-blur">
                <Leaf className="h-3.5 w-3.5" />
                {project.ambiente}
              </span>
            </div>

            <div>
              <h1 style={display} className="text-3xl font-extrabold tracking-tight text-[#16221c]">
                {project.title}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-[#5c6b63]">
                <MapPin className="h-4.5 w-4.5" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-[#e6ece8] bg-white p-5">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Disponible</div>
                <div style={display} className="mt-1 text-lg font-bold text-[#16221c]">{project.available}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Precio / ha</div>
                <div style={display} className="mt-1 text-lg font-bold text-[#16553f]">{project.price}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Año</div>
                <div style={display} className="mt-1 text-lg font-bold text-[#16221c]">{project.year}</div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-[#e6ece8] bg-white p-5">
              <h2 style={display} className="mb-2 text-base font-bold text-[#16221c]">Sobre la zona</h2>
              <p className="text-sm leading-relaxed text-[#5c6b63]">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.services.map((s) => {
                  const Icon = serviceIcon[s] || Leaf
                  return (
                    <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf0ec] px-3 py-1.5 text-xs font-semibold text-[#16553f]">
                      <Icon className="h-3.5 w-3.5" />
                      {s}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PurchaseForm project={project} projectId={projectId} />

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#9aa8a0]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1d6b4f]" />
              Operación trazable on-chain · Certificado oficial al finalizar
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
