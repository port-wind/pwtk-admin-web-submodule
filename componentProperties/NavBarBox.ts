import type { IComponentProperty, ISetStyle } from './index'

// 导航菜单组件配置类型
export interface NavBarBoxConfigType {
  model: string
  backgroundColor: string
  textColor: string
  activeColor: string
  showLogo: boolean
  logoSrc: string
  menuItems: Array<{
    text: string
    url: string
    icon?: string
    active: boolean
  }>
  layout: 'horizontal' | 'vertical'
  sticky: boolean
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<NavBarBoxConfigType>>>()

componentProperties.set('NavBarBox', {
  component: 'NavBarBox',
  text: '导航菜单',
  active: false,
  style: 'NavBarBoxStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '导航菜单模块',
    componentType: 'NavBarBox',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      model: 's1',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      activeColor: '#1989fa',
      showLogo: true,
      logoSrc: '',
      menuItems: [
        { text: '首页', url: '/', active: true },
        { text: '产品', url: '/products', active: false },
        { text: '服务', url: '/services', active: false },
        { text: '关于', url: '/about', active: false }
      ],
      layout: 'horizontal',
      sticky: false
    }
  }
})

export default componentProperties
