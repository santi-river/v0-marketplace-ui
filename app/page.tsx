"use client"

import { SheetTitle as SheetTitleComponent } from "@/components/ui/sheet"
import { SheetHeader as SheetHeaderComponent } from "@/components/ui/sheet"
import { SheetContent as SheetContentComponent } from "@/components/ui/sheet"
import { Sheet } from "@/components/ui/sheet"
import { Search, Filter, MapPin, ChevronLeft, ChevronRight, Leaf, Minus, Plus, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { projects, type Zone } from "@/data/projects"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const filteredZones = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalHectares = projects.reduce((s, p) => s + p.availableNumber, 0)

  const handleQuickView = (zone: Zone) => {
    setSelectedZone(zone)
    setQuantity(1)
    setIsSheetOpen(true)
  }

  const totalPrice = selectedZone ? selectedZone.priceNumber * quantity : 0

  return (
    <div className="min-h-screen bg-[#f4f7f4]">
      <SiteHeader />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(130%_130%_at_82%_0%,#1f5a43_0%,#0c3e2e_48%,#083828_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{ backgroundImage: "url('/sierras-norte-mountains.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#083828]/20 to-[#083828]/60" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 md:py-10">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#f1c766] backdrop-blur">
              <Leaf className="h-3.5 w-3.5" />
              MARKETPLACE DE TOKENS
            </div>
            <h1 style={display} className="text-3xl font-extrabold leading-[1.04] tracking-tight text-white md:text-[40px]">
              Mercado de créditos <span className="text-[#f1c766]">ecosistémicos</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
              Comprá tokens respaldados por zonas verificadas de conservación, restauración y captura de carbono en la
              Provincia de Córdoba. Cada compra emite un certificado oficial.
            </p>
          </div>

          {/* Stats + ODS */}
          <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4" style={{ minWidth: "min(100%, 480px)" }}>
              {[
                { k: `${projects.length}`, v: "Zonas activas" },
                { k: totalHectares.toLocaleString("es-AR"), v: "Hectáreas disponibles" },
                { k: "5,00 u$", v: "Precio por hectárea" },
                { k: "100%", v: "Trazabilidad on-chain" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 backdrop-blur">
                  <div style={display} className="text-xl font-extrabold text-white">
                    {s.k}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/65">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <p className="hidden max-w-[180px] text-[11px] leading-snug text-white/55 lg:block">
                ODS 13 y 15, con el 17 como articulador y co-beneficios en 1, 2, 6 y 14.
              </p>
              <Image src="/sdg-icons.png" alt="Objetivos de Desarrollo Sostenible" width={380} height={40} className="h-8 w-auto opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARKETPLACE ============ */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 style={display} className="text-xl font-bold text-[#16221c]">
              Zonas disponibles
            </h2>
            <p className="mt-0.5 text-sm text-[#5c6b63]">
              {filteredZones.length} {filteredZones.length === 1 ? "zona" : "zonas"} · Provincia de Córdoba
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa8a0]" />
              <Input
                type="search"
                placeholder="Buscar zona o ubicación"
                className="h-11 rounded-xl border-[#e6ece8] bg-white pl-10 text-sm text-[#16221c] placeholder:text-[#9aa8a0] focus-visible:ring-[#1d6b4f]/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 gap-2 rounded-xl border-[#e6ece8] bg-white text-[#16221c] hover:bg-[#f0f4f1]">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSearchQuery("")}>Todos los ecosistemas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchQuery("Humedal")}>Humedales</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchQuery("Bosque")}>Bosques</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchQuery("Pastizal")}>Pastizales</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Zone grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredZones.map((zone) => (
            <div
              key={zone.id}
              className="group overflow-hidden rounded-2xl border border-[#e6ece8] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(12,53,39,0.35)]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={zone.image || "/placeholder.svg"}
                  alt={zone.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#083828]/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold tracking-wide text-[#16553f] shadow-sm">
                  {zone.badge}
                </span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#083828]/70 px-2.5 py-1 text-[11px] font-medium text-[#f1c766] backdrop-blur">
                  <Leaf className="h-3 w-3" />
                  {zone.ambiente}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-sm font-medium text-white">
                  <MapPin className="h-3.5 w-3.5" />
                  {zone.location}
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 style={display} className="mb-4 text-lg font-bold text-[#16221c]">
                  {zone.title}
                </h3>

                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#f4f7f4] px-3.5 py-3">
                    <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Disponible</div>
                    <div className="mt-0.5 text-sm font-bold text-[#16221c]">{zone.available}</div>
                  </div>
                  <div className="rounded-xl bg-[#f4f7f4] px-3.5 py-3">
                    <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Precio / ha</div>
                    <div className="mt-0.5 text-sm font-bold text-[#16553f]">{zone.price}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleQuickView(zone)}
                    className="h-11 rounded-xl border-[#d4ddd7] bg-white font-semibold text-[#16553f] hover:bg-[#f0f4f1]"
                  >
                    Detalles
                  </Button>
                  <Link href={`/proyecto/${zone.id}`}>
                    <Button className="h-11 w-full rounded-xl bg-[#16553f] font-semibold text-white hover:bg-[#114433]">
                      Comprar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredZones.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d4ddd7] bg-white py-20 text-center">
            <p style={display} className="text-lg font-bold text-[#16221c]">No se encontraron zonas</p>
            <p className="mt-1 text-sm text-[#5c6b63]">Probá con otro término de búsqueda.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredZones.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-[#5c6b63] hover:bg-[#f0f4f1]">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className="h-9 w-9 rounded-lg bg-[#16553f] text-white hover:bg-[#114433]">1</Button>
            {[2, 3, 4].map((page) => (
              <Button key={page} variant="ghost" className="h-9 w-9 rounded-lg text-[#16221c] hover:bg-[#f0f4f1]">
                {page}
              </Button>
            ))}
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-[#5c6b63] hover:bg-[#f0f4f1]">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#e6ece8] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-[#5c6b63] sm:flex-row">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#1d6b4f]" />
            Gobierno de la Provincia de Córdoba
          </div>
          <span>Mercado de créditos ecosistémicos · Trazabilidad on-chain</span>
        </div>
      </footer>

      {/* ============ QUICK-VIEW SHEET ============ */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContentComponent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeaderComponent>
            <SheetTitleComponent style={display} className="text-2xl font-bold text-[#16221c]">
              Detalles de la zona
            </SheetTitleComponent>
          </SheetHeaderComponent>

          {selectedZone && (
            <div className="mt-6 space-y-6">
              <div className="relative h-52 overflow-hidden rounded-2xl">
                <img src={selectedZone.image || "/placeholder.svg"} alt={selectedZone.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#083828]/60 to-transparent" />
                <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-bold text-[#16553f]">
                  {selectedZone.badge}
                </span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#083828]/70 px-2.5 py-1 text-[11px] font-medium text-[#f1c766]">
                  <Leaf className="h-3 w-3" />
                  {selectedZone.ambiente}
                </span>
              </div>

              <div>
                <h3 style={display} className="text-xl font-bold text-[#16221c]">
                  {selectedZone.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#5c6b63]">
                  <MapPin className="h-4 w-4" />
                  {selectedZone.location}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-2xl bg-[#f4f7f4] p-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Disponible</div>
                  <div className="mt-0.5 text-sm font-bold text-[#16221c]">{selectedZone.available}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Precio / ha</div>
                  <div className="mt-0.5 text-sm font-bold text-[#16553f]">{selectedZone.price}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-[#5c6b63]">Año</div>
                  <div className="mt-0.5 text-sm font-bold text-[#16221c]">{selectedZone.year}</div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#16221c]">Cantidad (hectáreas)</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="h-11 w-11 rounded-xl border-[#d4ddd7]"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <div style={display} className="text-3xl font-extrabold text-[#16221c]">
                      {quantity}
                    </div>
                    <div className="text-xs text-[#5c6b63]">hectáreas</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.min(selectedZone.availableNumber, q + 1))}
                    disabled={quantity >= selectedZone.availableNumber}
                    className="h-11 w-11 rounded-xl border-[#d4ddd7]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2 rounded-2xl bg-[#f4f7f4] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5c6b63]">Precio por hectárea</span>
                  <span className="font-medium text-[#16221c]">{selectedZone.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5c6b63]">Cantidad</span>
                  <span className="font-medium text-[#16221c]">{quantity} ha</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-[#e0e6e2] pt-2">
                  <span className="text-base font-bold text-[#16221c]">Total</span>
                  <span style={display} className="text-2xl font-extrabold text-[#16553f]">
                    {totalPrice.toFixed(2)} u$
                  </span>
                </div>
              </div>

              <Link href={`/proyecto/${selectedZone.id}`}>
                <Button className="h-12 w-full gap-2 rounded-xl bg-[#16553f] text-base font-semibold text-white hover:bg-[#114433]">
                  Comprar {quantity} hectárea{quantity > 1 ? "s" : ""}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </SheetContentComponent>
      </Sheet>
    </div>
  )
}
