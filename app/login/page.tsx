"use client"

import { useState } from "react"
import { Mail, ArrowRight, ShieldCheck, BarChart3, Leaf, Boxes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

const display = { fontFamily: "var(--font-manrope), system-ui, sans-serif" }

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Prototipo sin validación: ingresa directamente
    login(email || "invitado@cordoba.gob.ar")
    router.push("/")
  }

  const features = [
    { icon: ShieldCheck, title: "Tokens verificados", desc: "Activos respaldados por zonas aprobadas." },
    { icon: BarChart3, title: "Certificado oficial", desc: "Comprobante emitido por cada compra." },
    { icon: Leaf, title: "Zonas locales", desc: "Iniciativas ambientales de la Provincia de Córdoba." },
    { icon: Boxes, title: "Trazabilidad on-chain", desc: "Registro transparente de cada operación." },
  ]

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      {/* ============ LEFT (form) ============ */}
      <section className="relative flex flex-col justify-center bg-white px-6 py-12 sm:px-12 lg:px-16">
        <div className="absolute left-6 top-8 sm:left-12 lg:left-16">
          <Image
            src="/secretaria-ambiente.png"
            alt="Secretaría General de Ambiente, Economía Circular y Biociudadanía"
            width={260}
            height={56}
            className="h-10 w-auto"
          />
        </div>

        <div className="mx-auto my-auto w-full max-w-[420px]">
          <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#b8902f]">
            Marketplace de tokens
          </div>
          <h1 style={display} className="text-4xl font-extrabold leading-[1.02] tracking-tight text-[#114433] sm:text-5xl">
            Iniciá sesión
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#5c6b63]">
            Accedé al marketplace de créditos ecosistémicos. Comprá tokens verificados y obtené tu certificado oficial de
            compensación.
          </p>

          <form onSubmit={handleSubmit} className="mt-9">
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#16221c]">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#9aa8a0]" />
              <Input
                id="email"
                type="email"
                placeholder="nombre@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-2xl border-[1.5px] border-[#e6ece8] bg-[#fbfdfb] pl-12 text-[15px] text-[#16221c] placeholder:text-[#a7b3ac] focus-visible:border-[#1d6b4f] focus-visible:ring-[#1d6b4f]/15"
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-[#5c6b63]">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-[18px] w-[18px] accent-[#16553f]"
              />
              Acepto los{" "}
              <a href="#" className="font-semibold text-[#16553f] underline decoration-[#f1c766] decoration-2 underline-offset-2">
                Términos y Condiciones
              </a>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              style={display}
              className="mt-7 h-14 w-full gap-2.5 rounded-2xl bg-gradient-to-b from-[#1d6b4f] to-[#16553f] text-[15px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(22,85,63,0.7)] hover:from-[#16553f] hover:to-[#114433]"
            >
              {isLoading ? "Ingresando..." : "Entrar al sistema"}
              <ArrowRight className="h-[18px] w-[18px]" />
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#9aa8a0]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#1d6b4f]" />
            Autenticación segura sin contraseñas · Web3Auth
          </div>
        </div>

        <div className="absolute bottom-7 left-6 text-xs text-[#9aa8a0] sm:left-12 lg:left-16">
          Gobierno de la Provincia de Córdoba
        </div>
      </section>

      {/* ============ RIGHT (brand) ============ */}
      <section className="relative hidden flex-col justify-center overflow-hidden px-12 py-12 lg:flex lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_82%_0%,#1f5a43_0%,#0c3e2e_46%,#083828_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{ backgroundImage: "url('/sierras-norte-mountains.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#083828]/15 to-[#083828]/55" />

        <div className="relative max-w-[540px]">
          <span className="mb-7 inline-flex rounded-xl bg-white px-3 py-2">
            <Image src="/cordoba-hacer.png" alt="Gobierno de Córdoba" width={150} height={40} className="h-8 w-auto" />
          </span>
          <h2 style={display} className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#f1c766] xl:text-[44px]">
            Mercado de créditos ecosistémicos
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/80">
            Comprá tokens respaldados por zonas verificadas de conservación, restauración y captura de carbono en la
            Provincia de Córdoba. Cada compra emite un certificado oficial.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-3.5">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
                <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1c766]/15 text-[#f1c766]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 style={display} className="text-[15px] font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-1 text-[13px] leading-snug text-white/65">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
