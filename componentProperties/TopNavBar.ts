// import componentProperties from '../componentProperties'
import type { TopNavBar } from '@/views/WebVision/components/componentsbiz/TopNavBar/type.ts'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<String, IComponentProperty<ISetStyle<TopNavBar>>>()

componentProperties.set('TopNavBar', {
  component: 'TopNavBar',
  text: '顶部导航',
  active: false,
  style: 'TopNavBarStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '顶部导航',
    componentType: 'TopNavBar',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '首页',
      logo: '',
      homeUrl: ''
    }
  }
})

export default componentProperties
