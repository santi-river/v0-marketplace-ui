"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate sending code via Web3Auth
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setCodeSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          <Image
            src="/images/cordoba-logo.png"
            alt="Gobierno de la Provincia de Córdoba"
            width={180}
            height={50}
            className="h-12 w-auto"
          />
          <div className="border-l border-gray-300 pl-6">
            <h1 className="text-lg font-semibold text-gray-800">
              Marketplace - Programa de atributos ambientales de Cordoba
            </h1>
            <p className="text-sm text-gray-600">Portal de Compradores</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center text-center">
              {/* Email Icon */}
              <div className="w-16 h-16 rounded-xl bg-[#e8f4fc] flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-[#4fa8d1]" />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Iniciar sesion
              </h2>
              <p className="text-gray-600 mb-8">
                Ingresa tu email para recibir un codigo de verificacion
              </p>

              {!codeSent ? (
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  <div className="text-left">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 border-gray-300 bg-white"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full h-11 bg-[#4CAF50] hover:bg-[#43A047] text-white font-medium"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar codigo"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="w-full text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-medium">
                      Codigo enviado exitosamente
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Revisa tu correo electronico: {email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCodeSent(false)}
                    className="text-gray-600"
                  >
                    Enviar otro codigo
                  </Button>
                </div>
              )}

              {/* Divider */}
              <div className="relative w-full my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase tracking-wider">
                    Autenticacion Segura
                  </span>
                </div>
              </div>

              {/* Web3Auth Info */}
              <p className="text-sm text-[#4fa8d1] leading-relaxed">
                Utilizamos Web3Auth para verificar tu identidad de forma segura sin necesidad de contrasenas.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Gobierno de la Provincia de Cordoba
          </span>
          <span className="text-sm text-gray-600">
            Mercado de Servicios Digitales
          </span>
        </div>
      </footer>
    </div>
  )
}
