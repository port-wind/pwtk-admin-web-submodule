import { type IssueLine } from '../IssueLine/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<IssueLine>>>()

componentProperties.set('IssueLine', {
  component: 'IssueLine',
  text: '期数行',
  active: false,
  style: 'IssueLineStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '期数行',
    componentType: 'IssueLine',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      enable: true,
      title: '期数行',
      titlePrefix: '',
      subtitle: '最新数据',
      size: 10,
      forumId: '10',
      frontExtend_Enable: false,
      frontExtend_Content: '',
      backendextend_Enable: false,
      backendextend_Content: '',
      dynamicTemplate: '{{issueNumber}} {{shengxiao}} {{num}} {{size}}',
      dynamicActiveBg: '#ffeb3b',
      dynamicActiveText: '#000',
      dynamicActiveTextAlign: 'center',
      dynamicActiveFontSize: '1.4rem',
      dynamicActiveFontWeight: '600',
      dynamicNoResult: '#00F',
      styleHeader: {
        backgroundColor: '#f8f9fa',
        isGradient: true,
        headerBgColor: '#4a90e2',
        headerBg: '#09663f',
        headerBg2: '#1d9b3f',
        subTitleColor: '#ffffff',
        titleColor: '#FFFFFF',
        borderRadius: 0,
        padding: 0
      },
      styleMain: {
        borderRadius: 8,
        layout: 'center',
        contentPaddingLeftRight: 10,
        contentPaddingTopBottom: 19,
        paddingLeftRight: 5,
        paddingTopBottom: 7,
        columnCount: 1,
        itemSpacing: 0,
        listSpacing: 8,
        itemBackgroundColor: '#0DEEC5',
        backgroundColor: '#EACBCB'
      }
    }
  }
})

export default componentProperties
