// src/stores/counter.js
import { atom } from 'nanostores'

interface IComponentMap {
  [componentName: string]: {
    [key: string]: any
  }
}

interface IEditorStore {
  listKeys: any[]
  componentMap: IComponentMap
}

export const editorStore = atom<IEditorStore>({
  listKeys: [1, 2, 3, 4],
  componentMap: {}
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
