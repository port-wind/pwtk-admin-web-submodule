import type { IssueList } from '../IssueList/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<IssueList>>>()

componentProperties.set('IssueList', {
  component: 'IssueList',
  text: '图片卡片',
  active: false,
  style: 'IssueListStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '图片卡片',
    componentType: 'IssueList',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      showStatus: true,
      showPriority: true,
      showTime: true,
      showAssignee: true,
      showTags: true,
      imageUrl: '',
      title: '',
      description: '',
      link: '',
      enable: true,
      issueItems: [],
      imageStyleJSON: {
        enableHeight: false,
        height: 200,
        borderRadius: 8,
        maxHeight: 200,
        enableMaxHeight: false
      }
    }
  }
})

export default componentProperties
