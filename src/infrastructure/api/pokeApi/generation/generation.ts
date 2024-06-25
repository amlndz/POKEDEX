import { Generation } from '../../../../domain/models/Generacion'

export const GENERATIONS_GUIDE: Record<
  Generation,
  {
    offset: number
    limit: number
  }
> = {
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
