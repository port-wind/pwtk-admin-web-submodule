import type { TextLinkList } from '../TextLinkList/type'
import type { IComponentProperty, ISetStyle } from './index'

// 定义 TextLinkList 配置类型
const TextLinkListData = {
  title: '澳门好彩【热门推荐】',
  description: '热门推荐文本链接列表',
  enable: true,
  links: [
    {
      id: 'item_1',
      text: '稳准中半波',
      link: '/link1',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_2',
      text: '一字猪平特',
      link: '/link2',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_3',
      text: '大胆实一肖',
      link: '/link3',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    { id: 'item_4', text: '绝杀10码', link: '/link4', enabled: true, textColor: '#333333', backgroundColor: '#f5f5f5' },
    {
      id: 'item_5',
      text: '买啥就中奖',
      link: '/link5',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_6',
      text: '一句爆特码',
      link: '/link6',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_7',
      text: '白头翁中特',
      link: '/link7',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_8',
      text: '四肖选一肖',
      link: '/link8',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_9',
      text: '一肖中特码',
      link: '/link9',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_10',
      text: '特码草头王',
      link: '/link10',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_11',
      text: '新气三连肖',
      link: '/link11',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_12',
      text: '四肖博八码',
      link: '/link12',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_13',
      text: '九宫禁肖诗',
      link: '/link13',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_14',
      text: '16码爆中特',
      link: '/link14',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_15',
      text: '五尾期期中',
      link: '/link15',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_16',
      text: '一波博总码',
      link: '/link16',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_17',
      text: '六肖中特码',
      link: '/link17',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_18',
      text: '三肖博总码',
      link: '/link18',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_19',
      text: '极限杀码料',
      link: '/link19',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_20',
      text: '城区28码',
      link: '/link20',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_21',
      text: '财富六肖王',
      link: '/link21',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_22',
      text: '港澳计划王',
      link: '/link22',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_23',
      text: '金牌爆三尾',
      link: '/link23',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    },
    {
      id: 'item_24',
      text: '精品出四肖',
      link: '/link24',
      enabled: true,
      textColor: '#333333',
      backgroundColor: '#f5f5f5'
    }
  ],
  listStyleJSON: {
    headerBackgroundColor: '#4CAF50', // 绿色背景
    headerTextColor: '#ffffff',
    itemsPerRow: 3, // 每行3个
    itemSpacing: 10,
    itemPadding: 12,
    itemBorderRadius: 4,
    itemBackgroundColor: '#f5f5f5',
    itemTextColor: '#333333',
    itemBorderColor: '#d9d9d9',
    itemBorderWidth: 1,
    containerPadding: 15,
    itemHoverColor: '#e8f5e8'
  }
}

// 创建 Map 并导出
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
    memo: '文本链接列表组件',
    pageCode: '',
    configParamJson: {
      title: '澳门好彩【热门推荐】',
      subtitle: '',
      forumId: '',
      forumIcon: '',
      forumName: '',
      forumStatus: '',
      mainboardName: '',
      mainboardId: '',
      enable: true,
      size: 20,
      links: [],
      listStyleJSON: {
        itemSpacing: 4,
        itemPadding: 9,
        itemsPerRow: 1,
        itemBorderWidth: 1,
        containerPadding: 4,
        itemBorderRadius: 5,
        itemBackgroundColor: '#FCFCFC',
        itemBorderColor: '#DDDDDD',
        itemHoverColor: '',
        itemTextColor: '#000000',
        headerBackgroundColor: '#E76B6B',
        headerTextColor: '#F5F5F5'
      },
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
        headerTextColor: '#ffffff'
      }
    }
  }
})

export default componentProperties
