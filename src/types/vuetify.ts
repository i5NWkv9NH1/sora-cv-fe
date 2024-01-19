export type Variant = NonNullable<'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'>
export type ColorMode = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'
// ! settings
export type Size = 'x-small' | 'small' | 'default' | 'large' | 'x-large'
export type Density = null | 'default' | 'comfortable' | 'compact'
export interface DensityMode {
  label: string
  value: Density
  icon?: string
}
export interface SizeMode {
  label: string
  value: Size
}
export type Theme = 'auto' | 'light' | 'dark'
export interface ThemeMode {
  label: string
  value: Theme
  icon?: string
}
