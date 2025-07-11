import type { ISetStyle } from '../componentProperties/index'

export interface IStyleMain {
  padding: number
  borderRadius: number
  backgroundColor: string
  textAlign: 'left' | 'center' | 'right'
  fontSize: number
  fontWeight: number
  textColor: string
}

export interface IStyleHeader {
  backgroundColor: string
  isGradient: boolean
  headerBgColor: string
  headerBg: string
  headerBg2: string
  subTitleColor: string
  titleColor: string
}

export interface IZodiacCardStyle {
  backgroundColor: string
  borderRadius: number
  borderColor: string
  borderWidth: number
  padding: number
  shadowColor: string
  shadowBlur: number
  hoverShadowBlur: number
  hoverTransform: string
}

export interface IZodiacImageStyle {
  width: number
  height: number
  borderRadius: number
  backgroundColor: string
  borderColor: string
  borderWidth: number
  marginBottom: number
}

export interface IZodiacNameStyle {
  fontSize: number
  fontWeight: number
  color: string
  marginBottom: number
  textAlign: 'left' | 'center' | 'right'
}

export interface INumberButtonStyle {
  width: number
  height: number
  borderRadius: number
  fontSize: number
  fontWeight: number
  gap: number
  shadowBlur: number
  hoverScale: number
  transition: string
}

export interface IGridLayoutStyle {
  columns: number
  gap: number
  padding: number
  backgroundColor: string
}

export interface IZodiacLayoutStyle {
  imagePosition: 'left' | 'center' | 'right'
}

export interface IResponsiveBreakpoints {
  tablet: number
  mobile: number
}

export interface IResponsiveStyles {
  tablet: {
    grid: Partial<IGridLayoutStyle>
    card: Partial<IZodiacCardStyle>
    image: Partial<IZodiacImageStyle>
    name: Partial<IZodiacNameStyle>
    button: Partial<INumberButtonStyle>
  }
  mobile: {
    grid: Partial<IGridLayoutStyle>
    card: Partial<IZodiacCardStyle>
    image: Partial<IZodiacImageStyle>
    name: Partial<IZodiacNameStyle>
    button: Partial<INumberButtonStyle>
  }
}

export interface Zodiac12WuxingPageConfig {
  title: string
  subtitle: string
  titlePrefix: string
  content: string
  enable: boolean
  showGameType: boolean
  gameType: string
  gameTypeCode: string
  forumId: string
  size: number

  // Style configurations
  styleHeader: IStyleHeader
  styleMain: IStyleMain
  zodiacCardStyle: IZodiacCardStyle
  zodiacImageStyle: IZodiacImageStyle
  zodiacNameStyle: IZodiacNameStyle
  numberButtonStyle: INumberButtonStyle
  gridLayoutStyle: IGridLayoutStyle
  zodiacLayoutStyle: IZodiacLayoutStyle

  // Color mappings
  customColorMapping: {
    redWave: string
    blueWave: string
    greenWave: string
  }

  // Responsive settings
  responsiveBreakpoints: IResponsiveBreakpoints
  responsiveStyles: IResponsiveStyles

  // Layout options
  zodiacOrder: string[]
  showClashNames: boolean
  animationDuration: number
}

export interface IDatas extends ISetStyle<Zodiac12WuxingPageConfig> {}
