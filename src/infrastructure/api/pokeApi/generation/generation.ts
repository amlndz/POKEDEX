import { Generation } from '../../../../domain/models/Generacion'

type Guide = {
  offset: number
  limit: number
}

export const GENERATIONS_GUIDE: Record<Generation, Guide> = {
  kanto: {
    offset: 0,
    limit: 151,
  },
  johto: {
    offset: 151,
    limit: 100,
  },
  hoenn: {
    offset: 251,
    limit: 135,
  },
  sinnoh: {
    offset: 386,
    limit: 107,
  },
} as const
