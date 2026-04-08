"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function VerificationContent() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6).split("")
      const newCode = [...code]
      pastedCode.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char
        }
      })
      setCode(newCode)
      // Focus last filled input or next empty
      const nextIndex = Math.min(index + pastedCode.length, 5)
      inputRefs.current[nextIndex]?.focus()
    } else {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join("")
    if (fullCode.length !== 6) return

    setIsLoading(true)
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store auth state in localStorage (simulated)
    localStorage.setItem("auth_email", email)
    localStorage.setItem("auth_token", "simulated_token_" + Date.now())
    
    // Redirect to marketplace
    router.push("/")
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    
    setResendTimer(60)
    // Simulate resending code
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const isCodeComplete = code.every(digit => digit !== "")

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
            {/* Back Link */}
            <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>

            {/* Email Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#4fc3f7] rounded-xl flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center text-foreground mb-2">
              Verificar codigo
            </h2>
            <p className="text-center text-muted-foreground mb-2">
              Ingresa el codigo de 6 digitos enviado a
            </p>
            <p className="text-center text-foreground font-medium mb-8">
              {email}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Code Inputs */}
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-semibold border-border"
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !isCodeComplete}
                className="w-full h-12 bg-[#ff7043] hover:bg-[#ff5722] text-white font-medium"
              >
                {isLoading ? "Verificando..." : "Verificar"}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Reenviar codigo en <span className="font-medium">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-[#4fc3f7] hover:underline font-medium"
                >
                  Reenviar codigo
                </button>
              )}
            </div>

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

export default function VerificationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  )
}
