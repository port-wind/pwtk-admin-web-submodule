import type { Issue24 } from '../Issue24/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<Issue24>>>()

componentProperties.set('Issue24', {
  component: 'Issue24',
  text: '精选24码',
  active: false,
  style: 'Issue24Style',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '精选24码',
    componentType: 'Issue24',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '澳门好彩',
      subtitle: '【精选24码】',
      enable: true,
      size: 10,
      forumId: 'haocai001',
      styleHeader: {
        backgroundColor: '#f8f9fa',
        isGradient: true,
        headerBgColor: '#4a90e2',
        headerBg: '#09663f',
        headerBg2: '#1d9b3f',
        subTitleColor: '#ffffff',
        titleColor: '#FFFFFF'
      },
      styleMain: {
        numberSpacing: 4,
        numberSize: 14,
        padding: 0,
        borderRadius: 8,
        showPeriod: true,
        showStatus: true,
        showResult: true,
        headerTextColor: '#ffffff',
      },
      forumIcon: '',
      forumName: '',
      forumStatus: '',
      mainboardName: '',
      mainboardId: ''
    }
  }
})

export default componentProperties
