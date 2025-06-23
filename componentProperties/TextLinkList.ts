import type { TextLinkList } from '../TextLinkList/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<TextLinkList>>>()

componentProperties.set('TextLinkList', {
  component: 'TextLinkList', // 中间预览组件名称
  text: '文本链接列表', // 显示名称
  active: true, // 是否可编辑
  style: 'TextLinkListStyle', // 右侧配置组件名称
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '文本链接列表',
    componentType: 'TextLinkList',
    componentSort: '',
    status: 'y',
    isView: 'y',
    memo: '自定义文本链接列表组件',
    pageCode: '',
    configParamJson: {
      title: '热门推荐',
      subtitle: '精选链接',
      enable: true,
      links: [
        {
          id: 'link1',
          text: '示例链接1',
          link: 'https://www.example.com',
          tag: '标签1',
          stag: '标签2',
          enabled: true,
          textColor: '#333333',
          backgroundColor: '#f5f5f5'
        },
        {
          id: 'link2',
          text: '示例链接2',  
          link: 'https://www.example2.com',
          tag: '标签1',
          stag: '标签2',
          enabled: true,
          textColor: '#333333',
          backgroundColor: '#f5f5f5'
        },
        {
          id: 'link3',
          text: '示例链接3',
          link: 'https://www.example3.com',
          tag: '标签1',
          stag: '标签2',
          enabled: true,
          textColor: '#333333',
          backgroundColor: '#f5f5f5'
        }
      ],
      listStyleJSON: {
        headerBackgroundColor: '#4a90e2',
        headerTextColor: '#ffffff',
        itemsPerRow: 2,
        itemSpacing: 8,
        itemPadding: 12,
        itemBorderRadius: 6,
        itemBackgroundColor: '#ffffff',
        itemTextColor: '#333333',
        itemBorderColor: '#e0e0e0',
        itemBorderWidth: 1,
        containerPadding: 12,
        itemHoverColor: '#f0f8ff'
      },
      styleHeader: {
        backgroundColor: '#4a90e2',
        isGradient: true,
        headerBgColor: '#4a90e2',
        headerBg: '#4a90e2',
        headerBg2: '#66bb6a',
        subTitleColor: '#ffffff',
        titleColor: '#ffffff'
      },
      styleMain: {
        numberSize: 14,
        numberSpacing: 4,
        padding: 0,
        borderRadius: 8,
        showPeriod: true,
        showStatus: true,
        showResult: true,
        headerTextColor: '#ffffff'
      }
    }
  }
})

export default componentProperties 