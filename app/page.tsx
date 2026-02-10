"use client"

import { SheetTitle as SheetTitleComponent } from "@/components/ui/sheet"
import { SheetHeader as SheetHeaderComponent } from "@/components/ui/sheet"
import { SheetContent as SheetContentComponent } from "@/components/ui/sheet"
import { Sheet } from "@/components/ui/sheet"
import {
  Search,
  LucideRefreshCcwDot as LucideRefreshCcwDotIcon,
  Bell,
  Filter,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    badge: "RDU2",
    title: "Bañados de Rio Dulce",
    location: "Mar chiquita • Córdoba",
    available: "2.000 Hectareas",
    availableNumber: 2000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Ambiente",
    image: "/wetland-bird-tero.jpg", // Updated to wetland bird image for Bañados de Rio Dulce
  },
  {
    id: 2,
    badge: "BCH2",
    title: "Bolson chaqueño",
    location: "Noroeste • Córdoba",
    available: "1.000 Hectareas",
    availableNumber: 1000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Ambiente",
    image: "/forest-hills-aerial.jpg",
  },
  {
    id: 3,
    badge: "PAL2",
    title: "Pampas de Altura",
    location: "Sierras pampeanas • Córdoba",
    available: "5.000 Hectareas",
    availableNumber: 5000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Ambiente",
    image: "/pampas-altura-grassland.jpg", // Updated to high-altitude grassland image for Pampas de Altura
  },
  {
    id: 4,
    badge: "PME2",
    title: "Pampas medanosa",
    location: "Sudoeste • Córdoba",
    available: "1.500 Hectareas",
    availableNumber: 1500,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Ambiente",
    image: "/pampas-medanosa-scrubland.jpg",
  },
  {
    id: 5,
    badge: "SNO2",
    title: "Sierras del norte",
    location: "Norte • Córdoba",
    available: "1.800 Hectareas",
    availableNumber: 1800,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Ambiente",
    image: "/sierras-mountains-fence.jpg",
  },
  {
    id: 6,
    badge: "VIN2",
    title: "Valles Intermontanos",
    location: "Punilla • Córdoba",
    available: "1.000 Hectareas",
    availableNumber: 1000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Ambiente",
    image: "/valles-forest-path.jpg",
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleComprarClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setQuantity(1)
    setIsSheetOpen(true)
  }

  const handleIncreaseQuantity = () => {
    if (selectedProject && quantity < selectedProject.availableNumber) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handlePurchase = () => {
    console.log("[v0] Purchase:", { project: selectedProject?.title, quantity })
    setIsSheetOpen(false)
  }

  const totalPrice = selectedProject ? selectedProject.priceNumber * quantity : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-shrink-0">
              <Image src="/cordoba-logo.png" alt="Córdoba" width={200} height={60} className="h-12 w-auto" />
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

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md"></div>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm"></div>

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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-2.5">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-foreground text-xl font-bold">
              Marketplace - Programa de atributos ambientales de Cordoba
            </h1>
            <p className="mt-1 text-base font-sans text-primary font-bold">Certificados de Servicios Ecosistémicos</p>
            <div className="mt-3 flex items-center gap-4">
              <p className="text-muted-foreground max-w-2xl text-xs font-medium">
                Contribuye directamente a los ODS 13 y 15, utilizando el 17 como motor de articulación y cooperación, y
                generando co-beneficios significativos en 1, 2, 6 y 14.
              </p>
              <Image
                src="/sdg-icons.png"
                alt="ODS: 13, 15, 17, 1, 2, 6, 14"
                width={500}
                height={60}
                className="h-12 w-auto flex-shrink-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm flex-shrink-0">
            <LucideRefreshCcwDotIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground whitespace-nowrap">Cotización del dia</span>
            <span className="font-semibold text-foreground whitespace-nowrap">1,00 u$ = $1.450,00</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar proyectos"
              className="pl-10 bg-muted border-0 text-sm text-foreground placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-background border text-foreground">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Ecosystems</DropdownMenuItem>
              <DropdownMenuItem>Wetlands</DropdownMenuItem>
              <DropdownMenuItem>Forests</DropdownMenuItem>
              <DropdownMenuItem>Grasslands</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Image */}
              <div className="relative h-48">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-background text-foreground text-xs font-medium rounded-full">
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{project.location}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Cantidad disponible</div>
                    <div className="text-sm font-semibold text-foreground">{project.available}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Precio por Hectárea</div>
                    <div className="text-sm font-semibold text-foreground">{project.price}</div>
                  </div>
                </div>

                {/* Year and Ambiente */}
                <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border border-t-0 border-b-0 border-l-0 border-r-0">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Año</div>
                    <div className="text-sm font-medium text-foreground">{project.year}</div>
                  </div>
                  <div className="flex items-start my-3.5 justify-center">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[rgba(0,170,227,0.507608703944994)] text-foreground">
                      {project.ambiente}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full border text-foreground hover:bg-muted bg-transparent">
                    Detalles
                  </Button>
                  <Link href={`/proyecto/${project.id}`}>
                    <Button className="w-full hover:bg-primary/90 text-primary-foreground bg-[rgba(0,170,226,1)]">
                      Comprar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button className="h-9 w-9 hover:bg-primary/90 text-primary-foreground bg-[rgba(0,170,226,1)]">1</Button>

          {[2, 3, 4, 5, 6, 7, 8].map((page) => (
            <Button key={page} variant="ghost" className="h-9 w-9 text-foreground hover:bg-muted">
              {page}
            </Button>
          ))}

          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-muted">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      {/* Purchase Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContentComponent className="w-full sm:max-w-lg">
          <SheetHeaderComponent>
            <SheetTitleComponent className="text-2xl font-semibold">Detalles del Proyecto</SheetTitleComponent>
          </SheetHeaderComponent>

          {selectedProject && (
            <div className="mt-6 space-y-6">
              {/* Project Image */}
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-background text-foreground text-xs font-medium rounded-full">
                    {selectedProject.badge}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{selectedProject.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedProject.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[rgba(0,170,227,0.507608703944994)] text-foreground">
                    {selectedProject.ambiente}
                  </span>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Disponible</div>
                  <div className="text-sm font-semibold text-foreground">{selectedProject.available}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Precio por Hts</div>
                  <div className="text-sm font-semibold text-foreground">{selectedProject.price}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Año</div>
                  <div className="text-sm font-medium text-foreground">{selectedProject.year}</div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cantidad (Hectáreas)</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 bg-transparent"
                  >
                    -
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-semibold text-foreground">{quantity}</div>
                    <div className="text-xs text-muted-foreground">Hectáreas</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= selectedProject.availableNumber}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Precio por hectárea</span>
                  <span className="font-medium text-foreground">{selectedProject.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cantidad</span>
                  <span className="font-medium text-foreground">{quantity} Hts</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
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
            </div>
          )}
        </SheetContentComponent>
      </Sheet>
    </div>
  )
}
