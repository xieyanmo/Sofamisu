export type MasterMaterial = {
  label: string
}

export type MasterColor = {
  label: string
  swatch: string
}

export const masterData: {
  materials: Record<string, MasterMaterial>
  colors: Record<string, MasterColor>
}
