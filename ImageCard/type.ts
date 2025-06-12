import type { ISetStyle } from '@/views/WebVision/components/componentsbiz/componentProperties'

export interface IDatas extends ISetStyle<ImageCard> {}

export interface ImageCard {
  model: 's1' | 's2' | 's3'
  imageUrl: string
  title: string
  description: string
  link: string
} 