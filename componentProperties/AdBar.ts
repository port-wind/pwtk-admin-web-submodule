import type { AdBarConfigType } from '../AdBar/type'
import type { IComponentProperty, ISetStyle } from './index'


const componentProperties = new Map<String, IComponentProperty<ISetStyle<AdBarConfigType>>>()

componentProperties.set('AdBar', {
  component: 'AdBar',
  text: '推广广告',
  active: false,
  style: 'AdBarStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '推广广告模块',
    componentType: 'AdBar',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      model: 's1',
      total: 12,
      adData: [
        {
          index: 1,
          img: '',
          link: '',
          name: '广告位1'
        },
        {
          index: 2,
          img: '',
          link: '',
          name: '广告位2'
        },
        {
          index: 3,
          img: '',
          link: '',
          name: '广告位3'
        }
      ],
      title: '推广广告',
      showTitle: true,
      showText: true,
      layout: 'horizontal',
      adCount: 3
    }
  }
})

export default componentProperties
