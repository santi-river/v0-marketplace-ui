export type Zone = {
  id: number
  badge: string
  title: string
  location: string
  available: string
  availableNumber: number
  price: string
  priceNumber: number
  year: string
  ambiente: string
  image: string
  description: string
  services: string[]
}

export const projects: Zone[] = [
  {
    id: 1,
    badge: "RDU2",
    title: "Bañados de Río Dulce",
    location: "Mar Chiquita • Córdoba",
    available: "2.000 Hectáreas",
    availableNumber: 2000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Humedal",
    image: "/wetland-bird-tero.jpg",
    description:
      "Humedal de importancia internacional que alberga la mayor población de flamencos del país y regula el ciclo hídrico de la región. La conservación de esta zona protege la biodiversidad y captura carbono en sus suelos.",
    services: ["Agua", "Biodiversidad", "CO₂"],
  },
  {
    id: 2,
    badge: "BCH2",
    title: "Bolsón Chaqueño",
    location: "Noroeste • Córdoba",
    available: "1.000 Hectáreas",
    availableNumber: 1000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Bosque",
    image: "/forest-hills-aerial.jpg",
    description:
      "Bosque nativo chaqueño con alta capacidad de captura de carbono y refugio de especies en peligro. La restauración de esta zona recupera corredores biológicos y suelos productivos.",
    services: ["Biodiversidad", "CO₂"],
  },
  {
    id: 3,
    badge: "PAL2",
    title: "Pampas de Altura",
    location: "Sierras Pampeanas • Córdoba",
    available: "5.000 Hectáreas",
    availableNumber: 5000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Pastizal",
    image: "/pampas-altura-grassland.jpg",
    description:
      "Pastizales de altura que actúan como esponjas naturales, garantizando la provisión de agua a las cuencas serranas y almacenando carbono en sus raíces y suelos.",
    services: ["Agua", "CO₂"],
  },
  {
    id: 4,
    badge: "PME2",
    title: "Pampa Medanosa",
    location: "Sudoeste • Córdoba",
    available: "1.500 Hectáreas",
    availableNumber: 1500,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Pastizal",
    image: "/pampas-medanosa-scrubland.jpg",
    description:
      "Ecosistema de médanos y pastizales que previene la desertificación del sudoeste cordobés. Su conservación estabiliza los suelos y sostiene la biodiversidad local.",
    services: ["Biodiversidad", "CO₂"],
  },
  {
    id: 5,
    badge: "SNO2",
    title: "Sierras del Norte",
    location: "Norte • Córdoba",
    available: "1.800 Hectáreas",
    availableNumber: 1800,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Bosque",
    image: "/sierras-mountains-fence.jpg",
    description:
      "Bosque serrano que protege las nacientes de agua del norte provincial y captura carbono. La conservación de esta zona asegura servicios ecosistémicos clave para las comunidades.",
    services: ["Agua", "Biodiversidad", "CO₂"],
  },
  {
    id: 6,
    badge: "VIN2",
    title: "Valles Intermontanos",
    location: "Punilla • Córdoba",
    available: "1.000 Hectáreas",
    availableNumber: 1000,
    price: "5,00 u$",
    priceNumber: 5,
    year: "2025",
    ambiente: "Bosque",
    image: "/valles-forest-path.jpg",
    description:
      "Valles con bosque nativo y cursos de agua que sostienen el turismo y la producción de Punilla. La restauración recupera la cobertura vegetal y la captura de carbono.",
    services: ["Agua", "Biodiversidad", "CO₂"],
  },
]
