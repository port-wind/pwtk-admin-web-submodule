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
      styleJSON: {
        backgroundColor: '#f8f9fa',
        isGradient: true,
        headerBg: '#09663f',
        headerBg2: '#1d9b3f',
        headerBgColor: '#4a90e2',
        titleColor: '#333333',
        numberSize: 14,
        numberSpacing: 4,
        borderRadius: 8,
        padding: 16,
        showPeriod: true,
        showStatus: true,
        showResult: true,
        headerTextColor: '#ffffff'
      },
      issueList: [
        {
          id: '1',
          period: '168期',
          drawTitle: '精选24码',
          numbers: [
            { number: '16', color: 'blue', isHighlight: false },
            { number: '35', color: 'blue', isHighlight: false },
            { number: '22', color: 'blue', isHighlight: false },
            { number: '10', color: 'blue', isHighlight: false },
            { number: '36', color: 'blue', isHighlight: false },
            { number: '47', color: 'blue', isHighlight: false },
            { number: '43', color: 'blue', isHighlight: false },
            { number: '40', color: 'blue', isHighlight: false },
            { number: '01', color: 'blue', isHighlight: false },
            { number: '37', color: 'blue', isHighlight: false },
            { number: '12', color: 'blue', isHighlight: false },
            { number: '32', color: 'blue', isHighlight: false },
            { number: '38', color: 'blue', isHighlight: false },
            { number: '33', color: 'blue', isHighlight: false },
            { number: '23', color: 'blue', isHighlight: false },
            { number: '39', color: 'blue', isHighlight: false },
            { number: '28', color: 'blue', isHighlight: false },
            { number: '11', color: 'blue', isHighlight: false },
            { number: '31', color: 'blue', isHighlight: false },
            { number: '17', color: 'blue', isHighlight: false },
            { number: '04', color: 'blue', isHighlight: false },
            { number: '34', color: 'blue', isHighlight: false },
            { number: '30', color: 'blue', isHighlight: false },
            { number: '26', color: 'blue', isHighlight: false }
          ],
          status: '开?',
          result: '00准',
          enabled: true
        },
        {
          id: '2',
          period: '167期',
          drawTitle: '精选24码',
          numbers: [
            { number: '16', color: 'blue', isHighlight: false },
            { number: '46', color: 'blue', isHighlight: false },
            { number: '05', color: 'blue', isHighlight: false },
            { number: '20', color: 'blue', isHighlight: false },
            { number: '01', color: 'blue', isHighlight: false },
            { number: '06', color: 'blue', isHighlight: false },
            { number: '36', color: 'blue', isHighlight: false },
            { number: '29', color: 'blue', isHighlight: false },
            { number: '22', color: 'blue', isHighlight: false },
            { number: '08', color: 'blue', isHighlight: false },
            { number: '45', color: 'blue', isHighlight: false },
            { number: '23', color: 'blue', isHighlight: false },
            { number: '44', color: 'blue', isHighlight: false },
            { number: '11', color: 'blue', isHighlight: false },
            { number: '35', color: 'blue', isHighlight: false },
            { number: '37', color: 'blue', isHighlight: false },
            { number: '26', color: 'yellow', isHighlight: true },
            { number: '02', color: 'blue', isHighlight: false },
            { number: '24', color: 'blue', isHighlight: false },
            { number: '21', color: 'blue', isHighlight: false },
            { number: '18', color: 'blue', isHighlight: false },
            { number: '49', color: 'blue', isHighlight: false },
            { number: '12', color: 'blue', isHighlight: false },
            { number: '41', color: 'blue', isHighlight: false }
          ],
          status: '开龙26准',
          result: '',
          enabled: true
        }
      ]
    }
  }
})

export default componentProperties