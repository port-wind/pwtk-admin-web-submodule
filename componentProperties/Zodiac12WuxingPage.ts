import type { Zodiac12WuxingPageConfig } from '../Zodiac12WuxingPage/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<Zodiac12WuxingPageConfig>>>()

componentProperties.set('Zodiac12WuxingPage', {
  component: 'Zodiac12WuxingPage',
  text: '玩法说明',
  active: false,
  style: 'Zodiac12WuxingPageStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '玩法说明',
    componentType: 'Zodiac12WuxingPage',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      titlePrefix: '玩法说明',
      title: '玩法说明',
      subtitle: '这是一个玩法说明',
      content: '这里是内容区域，您可以在此处添加任何文本内容。',
      enable: true,
      showGameType: false,
      gameType: '2032',
      gameTypeCode: 'a6',
      forumId: '10',
      size: 10,
      styleHeader: {
        backgroundColor: '#f8f9fa',
        isGradient: true,
        headerBgColor: '#4a90e2',
        headerBg: '#4a90e2',
        headerBg2: '#5aa5f0',
        subTitleColor: '#ffffff',
        titleColor: '#ffffff'
      },
      styleMain: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 400,
        textColor: '#333333'
      },
      zodiacCardStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 16,
        shadowColor: '#000000',
        shadowBlur: 10,
        hoverShadowBlur: 20,
        hoverTransform: 'scale(1.05)'
      },
      zodiacImageStyle: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        marginBottom: 16
      },
      zodiacNameStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#333333',
        marginBottom: 16,
        textAlign: 'center'
      },
      numberButtonStyle: {
        width: 100,
        height: 100,
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 400,
        gap: 16,
        shadowBlur: 10,
        hoverScale: 1.1,
        transition: 'all 0.3s ease'
      },
      gridLayoutStyle: {
        columns: 3,
        gap: 16,
        padding: 16,
        backgroundColor: '#f8f9fa'
      },
      zodiacLayoutStyle: {
        imagePosition: 'center'
      },
      showWuxing: true,
      wuxingTitle: '五行',
      wuxingAreaStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginTop: 16
      },
      wuxingGridStyle: {
        columns: 3,
        gap: 16,
        padding: 16
      },
      wuxingCardStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000000',
        shadowBlur: 10,
        hoverShadowBlur: 20
      },
      wuxingTitleStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#333333',
        marginBottom: 16,
        textAlign: 'center'
      },
      wuxingElementStyle: {
        nameSize: 14,
        nameWeight: 400,
        descriptionSize: 14,
        descriptionColor: '#333333',
        numberSize: 14,
        numberWeight: 400,
        numberWidth: 100,
        numberHeight: 100,
        numberFontSize: 14,
        numberBorderRadius: 8
      },
      showWaveColor: true,
      waveColorTitle: '波色',
      waveColorAreaStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginTop: 16
      },
      waveColorGridStyle: {
        columns: 3,
        gap: 16,
        padding: 16
      },
      waveColorCardStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000000',
        shadowBlur: 10,
        hoverShadowBlur: 20
      },
      waveColorTitleStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#333333',
        marginBottom: 16,
        textAlign: 'center'
      },
      waveColorElementStyle: {
        nameSize: 14,
        nameWeight: 400,
        descriptionSize: 14,
        descriptionColor: '#333333',
        numberSize: 14,
        numberWeight: 400
      },
      showNumberOddEven: true,
      numberOddEvenTitle: '单双',
      numberOddEvenAreaStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginTop: 16
      },
      numberOddEvenGridStyle: {
        columns: 3,
        gap: 16,
        padding: 16
      },
      numberOddEvenCardStyle: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000000',
        shadowBlur: 10,
        hoverShadowBlur: 20
      },
      numberOddEvenTitleStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#333333',
        marginBottom: 16
      },
      numberOddEvenElementStyle: {
        nameSize: 14,
        nameWeight: 400,
        descriptionSize: 14,
        descriptionColor: '#333333',
        numberSize: 14,
        numberWeight: 400
      },
      customColorMapping: {
        redWave: '#f8f9fa',
        blueWave: '#f8f9fa',
        greenWave: '#f8f9fa'
      },
      responsiveBreakpoints: {
        tablet: 768,
        mobile: 480
      },
      responsiveStyles: {
        tablet: {},
        mobile: {}
      },
      zodiacOrder: [],
      showClashNames: false,
      animationDuration: 1000
    }
  }
})

export default componentProperties
