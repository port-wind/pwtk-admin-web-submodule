const IssueLineData = {
  componentType: 'IssueLine',
  componentId: '',
  componentName: '期数行组件',
  configParamJson: {
    enable: true,
    title: '期数列表',
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
      borderRadius: 8,
      padding: 12,
      headerBgColor: '#4a90e2',
      headerBg: '#4a90e2',
      headerBg2: '#357abd',
      isGradient: true,
      titleColor: '#ffffff',
      subTitleColor: '#ffffff'
    },
    styleMain: {
      backgroundColor: '#ffffff',
      contentPaddingLeftRight: 16,
      contentPaddingTopBottom: 12,
      paddingLeftRight: 16,
      paddingTopBottom: 8,
      itemBackgroundColor: '#f5f7fa',
      borderRadius: 4,
      listSpacing: 8,
      itemSpacing: 8,
      layout: 'start',
      columnCount: 1
    }
  },
  isView: 'y'
}

export default IssueLineData 