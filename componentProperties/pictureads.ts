import type { PictureadsConfigType } from '../PictureADs/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<String, IComponentProperty<ISetStyle<PictureadsConfigType>>>()

componentProperties.set('pictureads', {
  component: 'pictureads',
  text: '图片广告',
  active: false,
  style: 'pictureadsstyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '图片广告',
    componentType: 'pictureads',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      text: '图片广告',
      swiperType: 0,
      borderRadius: 0,
      pageMargin: 0,
      imageMargin: 0,
      pagingType: 0,
      rowindividual: 2,
      imageList: []
    }
  }
})

export default componentProperties
