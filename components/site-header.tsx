"use client"

import { RefreshCcwDot, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function SiteHeader() {
  const { isAuthenticated, email, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6ece8] bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[68px] items-center justify-between gap-4">
          {/* Logos */}
          <Link href="/" className="flex items-center gap-4">
            <Image src="/cordoba-hacer.png" alt="Gobierno de Córdoba" width={150} height={44} className="h-9 w-auto" />
            <span className="hidden h-9 w-px bg-[#e0e6e2] sm:block" />
            <Image
              src="/secretaria-ambiente.png"
              alt="Secretaría General de Ambiente, Economía Circular y Biociudadanía"
              width={210}
              height={44}
              className="hidden h-8 w-auto md:block"
            />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[#e6ece8] bg-[#f4f7f4] px-3.5 py-1.5 text-xs lg:flex">
              <RefreshCcwDot className="h-3.5 w-3.5 text-[#1d6b4f]" />
              <span className="text-[#5c6b63]">Cotización del día</span>
              <span className="font-semibold text-[#16221c]">1,00 u$ = $1.500,00</span>
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-[#f0f4f1]">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-[#16553f] text-sm font-semibold text-white">
                        {email ? email.substring(0, 2).toUpperCase() : "US"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left sm:block">
                      <div className="max-w-[160px] truncate text-sm font-semibold text-[#16221c]">
                        {email || "Usuario"}
                      </div>
                      <div className="text-xs text-[#5c6b63]">Comprador</div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="gap-2 rounded-xl bg-[#16553f] px-5 font-semibold text-white hover:bg-[#114433]">
                  <LogIn className="h-4 w-4" />
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
