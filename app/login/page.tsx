"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate sending verification code
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Navigate to verification page with email
    router.push(`/login/verificar?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center gap-6">
            <Image src="/cordoba-logo.png" alt="Córdoba" width={160} height={50} className="h-10 w-auto" />
            <div>
              <h1 className="text-foreground text-lg font-semibold">
                Marketplace - Programa de atributos ambientales de Cordoba
              </h1>
              <p className="text-sm text-muted-foreground">Portal de Compradores</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-xl shadow-lg p-8">
            {/* Email Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#4fc3f7] rounded-xl flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center text-foreground mb-2">
              Iniciar sesion
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Ingresa tu email para recibir un codigo de verificacion
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 border-border"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !email}
                className="w-full h-12 bg-[#ff7043] hover:bg-[#ff5722] text-white font-medium"
              >
                {isLoading ? "Enviando..." : "Enviar codigo"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium tracking-wider">
                AUTENTICACION SEGURA
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Footer Text */}
            <p className="text-center text-sm text-[#4fc3f7]">
              Utilizamos Web3Auth para verificar tu identidad de forma segura sin necesidad de contraseñas.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-4">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Gobierno de la Provincia de Cordoba</span>
          <span className="text-sm text-muted-foreground">Mercado de Servicios Digitales</span>
        </div>
      </footer>
    </div>
  )
}
