import { EPlayGameCode, type IssueCatalog } from '../IssueCatalog/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<IssueCatalog>>>()

componentProperties.set('IssueCatalog', {
  component: 'IssueCatalog',
  text: '期数目录',
  active: false,
  style: 'IssueCatalogStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '期数目录',
    componentType: 'IssueCatalog',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '期数目录 title',
      titlePrefix: '',
      subtitle: '',
      enable: true,
      size: 2,
      mainboardId: 'tiantianhaocai',
      forumId: 'tiantianhaocai1',
      forumIcon: 'dev/bbs/forum/icon/3187e4e98b574bd8bf8022652ee23576.jpeg',
      forumName: '澳门好彩【精选24码】',
      forumStatus: 'y',
      mainboardName: '天天好彩',
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
        itemSpacing: 4,
        listSpacing: 4,
        contentPaddingLeftRight: 0,
        contentPaddingTopBottom: 0,
        paddingLeftRight: 0,
        paddingTopBottom: 10,
        borderRadius: 8,
        backgroundColor: '#f1f1f1',
        itemBackgroundColor: '#f1f1f1',
        layout: 'left',
        columnCount: 4
      },
      playGameCode: 8001,
      dynamicTemplate:
        '<p>{{issueNumber}} 期 &nbsp;<span style="color: rgb(9, 109, 217);">【 &nbsp;{{issue_lp00_p00}} &nbsp;{{issue_lp01_p00}} &nbsp;{{issue_lp01_p01}} &nbsp;】</span> &nbsp; 开 {{shengxiao}}{{num}}准</p>',
      dynamicActiveBg: '#ffeb3b',
      dynamicActiveText: '#000',
      dynamicNoResult: '未开奖',
      frontExtend_Enable: true,
      frontExtend_Content: '<p> 前置数据</p>',
      backendextend_Enable: true,
      backendextend_Content: '<p> 后置数据 </p>'
    }
  }
})

export default componentProperties
