// src/stores/counter.js
import { atom } from 'nanostores'

interface IComponentMap {
  [componentName: string]: {
    [key: string]: any
  }
}

interface MergeTag {
  title?: string
  value?: string
  menu?: MergeTag[]
}

interface IEditorStore {
  listKeys: any[]
  componentMap: IComponentMap
  customMergeTags: MergeTag[]
}

export const editorStore = atom<IEditorStore>({
  listKeys: [1, 2, 3, 4],
  componentMap: {},
  customMergeTags: []
})

export function setListKeys(listKeys: any[]) {
  editorStore.set({
    ...editorStore.get(),
    listKeys: listKeys
  })
}

export function clearListKeys() {
  editorStore.set({
    ...editorStore.get(),
    listKeys: []
  })
}

export function getListKeys() {
  return editorStore.get().listKeys
}

export function setComponentMapValue(componentName: string, key: string, value: any) {
  const currentStore = editorStore.get()
  const currentComponentMap = currentStore.componentMap || {}
  
  editorStore.set({
    ...currentStore,
    componentMap: {
      ...currentComponentMap,
      [componentName]: {
        ...(currentComponentMap[componentName] || {}),
        [key]: value
      }
    }
  })
}

export function getComponentMapValue(componentName: string, key: string) {
  const store = editorStore.get()
  return store.componentMap?.[componentName]?.[key]
}

export function clearComponentMap() {
  const currentStore = editorStore.get()
  editorStore.set({
    ...currentStore,
    componentMap: {}
  })
}

// ==================== customMergeTags 相关方法 ====================

// 设置合并标签列表
export function setCustomMergeTags(tags: MergeTag[]) {
  editorStore.set({
    ...editorStore.get(),
    customMergeTags: tags
  })
}

// 获取合并标签列表
export function getCustomMergeTags(): MergeTag[] {
  return editorStore.get().customMergeTags || []
}

// 添加单个合并标签（到根级别）
export function addCustomMergeTag(tag: MergeTag) {
  const currentStore = editorStore.get()
  const tags = [...(currentStore.customMergeTags || []), tag]
  editorStore.set({
    ...currentStore,
    customMergeTags: tags
  })
}

// 添加合并标签到指定分类
export function addMergeTagToCategory(categoryTitle: string, tag: MergeTag) {
  const currentStore = editorStore.get()
  const tags = [...(currentStore.customMergeTags || [])]
  
  // 查找指定分类
  const category = tags.find(t => t.title === categoryTitle)
  
  if (category) {
    // 如果分类存在，添加到其 menu 中
    if (!category.menu) {
      category.menu = []
    }
    category.menu.push(tag)
  } else {
    // 如果分类不存在，创建新分类
    tags.push({
      title: categoryTitle,
      menu: [tag]
    })
  }
  
  editorStore.set({
    ...currentStore,
    customMergeTags: tags
  })
}

// 删除合并标签（支持删除根级别和分类内的标签）
export function removeMergeTag(value: string) {
  const currentStore = editorStore.get()
  const tags = [...(currentStore.customMergeTags || [])]
  
  // 递归删除函数
  const removeFromArray = (arr: MergeTag[]): MergeTag[] => {
    return arr.filter(tag => {
      if (tag.value === value) {
        return false
      }
      if (tag.menu) {
        tag.menu = removeFromArray(tag.menu)
      }
      return true
    })
  }
  
  const updatedTags = removeFromArray(tags)
  
  editorStore.set({
    ...currentStore,
    customMergeTags: updatedTags
  })
}

// 清空所有合并标签
export function clearCustomMergeTags() {
  editorStore.set({
    ...editorStore.get(),
    customMergeTags: []
  })
}

// 从预设模板加载
export function loadMergeTagsTemplate(templateName: string) {
  const templates: Record<string, MergeTag[]> = {
    default: [
      {
        title: '用户信息',
        menu: [
          { value: 'User.Name', title: '用户名' },
          { value: 'User.Email', title: '邮箱' },
          { value: 'User.Phone', title: '电话' }
        ]
      },
      {
        title: '订单信息',
        menu: [
          { value: 'Order.Number', title: '订单号' },
          { value: 'Order.Date', title: '订单日期' },
          { value: 'Order.Total', title: '订单金额' }
        ]
      },
      {
        value: 'CurrentDate',
        title: '当前日期'
      },
      {
        value: 'CompanyName',
        title: '公司名称'
      }
    ],
    email: [
      {
        title: '收件人',
        menu: [
          { value: 'Recipient.Name', title: '收件人姓名' },
          { value: 'Recipient.Email', title: '收件人邮箱' },
          { value: 'Recipient.Title', title: '收件人职位' }
        ]
      },
      {
        title: '发件人',
        menu: [
          { value: 'Sender.Name', title: '发件人姓名' },
          { value: 'Sender.Email', title: '发件人邮箱' },
          { value: 'Sender.Signature', title: '发件人签名' }
        ]
      }
    ]
  }
  
  const template = templates[templateName]
  if (template) {
    setCustomMergeTags(template)
  }
}

// 导出 MergeTag 类型供其他文件使用
export type { MergeTag }
