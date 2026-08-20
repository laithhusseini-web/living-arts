export type SeedPlant = {
  slug: string
  name: string
  latin: string
  origin: string
  bestGrowth: string
  price: number
  stock: number
  light: 'low' | 'medium' | 'bright'
  growth: 'slow' | 'moderate' | 'fast'
  difficulty: 'easy' | 'moderate' | 'demanding'
  humidityMin: number
  humidityMax: number
  tempMin: number
  tempMax: number
  categories: string[]
  featured?: boolean
  photo?: string
}

export const seedCategories = [
  { slug: 'terrarium-jungle', title: 'Terrarium / Jungle plants', order: 1 },
  { slug: 'house-plants', title: 'House plants', order: 2 },
  { slug: 'closed-terrarium', title: 'Closed terrarium', order: 3 },
  { slug: 'open-bowl', title: 'Open bowl', order: 4 },
  { slug: 'vivarium', title: 'Vivarium', order: 5 },
  { slug: 'paludarium', title: 'Paludarium', order: 6 },
]

export const seedPlants: SeedPlant[] = [
  {
    slug: 'shield-aralia',
    name: 'Shield Aralia',
    latin: 'Polyscias scutellaria',
    origin: 'Eastern Malesia to the Southwest Pacific (Maluku, New Guinea, Solomon Islands & Vanuatu)',
    bestGrowth:
      'Warm, humid conditions; bright indirect light to partial shade.\nFertile, well-draining soil with consistent moisture; avoid waterlogging.',
    price: 5,
    stock: 4,
    light: 'bright',
    growth: 'moderate',
    difficulty: 'moderate',
    humidityMin: 60,
    humidityMax: 85,
    tempMin: 18,
    tempMax: 29,
    categories: ['house-plants', 'terrarium-jungle', 'vivarium'],
    featured: true,
    photo: 'shield-aralia.png',
  },
  {
    slug: 'cushion-moss',
    name: 'Cushion moss',
    latin: 'Leucobryum glaucum',
    origin: 'Temperate forest floors across Europe, Asia and eastern North America',
    bestGrowth:
      'Cool, shaded and constantly humid; low light suits it best.\nA thin bed of terrarium soil over drainage — a surface, not a pot.',
    price: 8.5,
    stock: 12,
    light: 'low',
    growth: 'slow',
    difficulty: 'easy',
    humidityMin: 80,
    humidityMax: 100,
    tempMin: 10,
    tempMax: 22,
    categories: ['closed-terrarium', 'vivarium', 'paludarium', 'terrarium-jungle'],
  },
  {
    slug: 'fittonia',
    name: 'Fittonia',
    latin: 'Fittonia albivenis',
    origin: 'Rainforest understorey of Peru, Colombia and the western Amazon basin',
    bestGrowth:
      'Warm and humid, medium indirect light — a closed jar suits her well.\nPeat-based mix kept lightly moist; never let her dry out for long.',
    price: 6,
    stock: 4,
    light: 'medium',
    growth: 'fast',
    difficulty: 'easy',
    humidityMin: 60,
    humidityMax: 90,
    tempMin: 18,
    tempMax: 27,
    categories: ['closed-terrarium', 'open-bowl', 'house-plants', 'terrarium-jungle'],
  },
  {
    slug: 'neoregelia-fireball',
    name: "Neoregelia 'Fireball'",
    latin: "Neoregelia 'Fireball'",
    origin: 'A cultivated hybrid of Brazilian Atlantic-forest bromeliads',
    bestGrowth:
      'Bright light brings out her red; warmth and moving air keep her healthy.\nAlmost no soil — mount her on wood or bark and fill her central cup.',
    price: 14,
    stock: 3,
    light: 'bright',
    growth: 'slow',
    difficulty: 'moderate',
    humidityMin: 50,
    humidityMax: 85,
    tempMin: 16,
    tempMax: 29,
    categories: ['vivarium', 'house-plants', 'terrarium-jungle'],
  },
  {
    slug: 'string-of-turtles',
    name: 'String of turtles',
    latin: 'Peperomia prostrata',
    origin: 'Rainforests of Brazil, trailing over rock and fallen wood',
    bestGrowth:
      'Bright indirect light, ordinary room humidity, and a dry spell between drinks.\nLoose, airy mix — tight wet soil is the one thing she resents.',
    price: 12,
    stock: 7,
    light: 'bright',
    growth: 'slow',
    difficulty: 'moderate',
    humidityMin: 40,
    humidityMax: 60,
    tempMin: 16,
    tempMax: 26,
    categories: ['open-bowl', 'house-plants'],
  },
  {
    slug: 'creeping-fig',
    name: 'Creeping fig',
    latin: 'Ficus pumila',
    origin: 'East Asia — southern China, Japan and Vietnam',
    bestGrowth:
      'Medium light, warmth, and something to climb; happy in a closed jar or a pot.\nAny good terrarium mix kept evenly moist.',
    price: 5.5,
    stock: 15,
    light: 'medium',
    growth: 'fast',
    difficulty: 'easy',
    humidityMin: 50,
    humidityMax: 90,
    tempMin: 15,
    tempMax: 28,
    categories: ['closed-terrarium', 'vivarium', 'paludarium', 'house-plants', 'terrarium-jungle'],
  },
  {
    slug: 'selaginella',
    name: 'Selaginella',
    latin: 'Selaginella kraussiana',
    origin: 'Damp forest floors of mainland Africa, the Azores and the Canary Islands',
    bestGrowth:
      'Low light and heavy, still air — a closed world suits her best.\nRich moisture-holding mix over good drainage; she drinks humidity more than water.',
    price: 7,
    stock: 9,
    light: 'low',
    growth: 'moderate',
    difficulty: 'demanding',
    humidityMin: 70,
    humidityMax: 100,
    tempMin: 15,
    tempMax: 26,
    categories: ['closed-terrarium', 'paludarium', 'terrarium-jungle'],
  },
]
