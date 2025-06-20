import type { IComponentProperty, ISetStyle } from './index'

// 公告组件配置类型
export interface NoticeConfigType {
  text: string
  noticeText: string // 内容
  backColor: string // 背景颜色
  textColor: string // 文字颜色
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<NoticeConfigType>>>()

componentProperties.set('notice', {
  component: 'notice',
  text: '公告',
  active: false,
  style: 'noticestyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '公告',
    componentType: 'notice',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      text: '公告',
      noticeText: '请填写内容，如果过长，将会在手机上滚动显示',
      backColor: 'rgb(255, 248, 233)',
      textColor: 'rgba(100, 101, 102)'
    }
  }
})

export default componentProperties
