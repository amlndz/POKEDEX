export type Pokemon = {
  name: string
  id: number
  image: string
  type: string[]
  weight: number
  height: number
  stats: {
    hp: number
    attack: number
    defense: number
    spattack: number
    spdefense: number
    speed: number
  }
}
