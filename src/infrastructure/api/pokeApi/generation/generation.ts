import { Generation } from '../../../../domain/models/Generacion'

export const GENERATIONS_GUIDE: Record<
  Generation,
  {
    offset: number
    limit: number
  }
> = {
  Kanto: {
    offset: 0,
    limit: 151,
  },
  Johto: {
    offset: 151,
    limit: 100,
  },
  Hoenn: {
    offset: 251,
    limit: 135,
  },
  Sinnoh: {
    offset: 386,
    limit: 107,
  },
  Teselia: {
    offset: 493,
    limit: 156,
  },
  Kalos: {
    offset: 649,
    limit: 72,
  },
  Alola: {
    offset: 721,
    limit: 88,
  },
  Galar: {
    offset: 809,
    limit: 89,
  },
} as const
