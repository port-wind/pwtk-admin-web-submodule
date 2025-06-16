import type { ImageGridList } from '../ImageGridList/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<ImageGridList>>>()

componentProperties.set('ImageGridList', {
  component: 'ImageGridList',
  text: '图片网格列表',
  active: false,
  style: 'ImageGridListStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '图片网格列表',
    componentType: 'ImageGridList',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '澳门好彩【热门推荐】',
      description: '精选彩票资讯图片',
      enable: true,
      gridItems: [
        {
          id: '1',
          title: '澳门跑狗图',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '2',
          title: '九肖十码',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '3',
          title: '大三巴30码',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '4',
          title: '水哥杀一肖',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '5',
          title: '老跑狗图',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '6',
          title: '水哥平特',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '7',
          title: '内幕资料',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '8',
          title: '天线宝宝图',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        },
        {
          id: '9',
          title: '澳门彩霸王',
          imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
          link: '#',
          enabled: true
        }
      ],
      gridStyleJSON: {
        columnsPerRow: 3,
        itemSpacing: 8,
        itemPadding: 8,
        borderRadius: 8,
        imageHeight: 120,
        titleFontSize: 14,
        titleColor: '#333333',
        backgroundColor: '#ffffff',
        borderColor: '#e4e7ed',
        borderWidth: 1,
        hoverEffect: true,
        showTitle: true
      }
    }
  }
})

export default componentProperties 