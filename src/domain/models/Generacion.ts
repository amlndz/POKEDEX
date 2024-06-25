export const GENERATIONS = ['kanto', 'johto', 'hoenn', 'sinnoh'] as const

export type Generation = (typeof GENERATIONS)[number]
