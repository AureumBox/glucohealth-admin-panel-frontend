export interface Medicament {
  id: string,
  tradeName: string | null,
  genericName: string,
  description: string,
  sideEffects: string[],
  presentations: string[]
}