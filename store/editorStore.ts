// src/stores/counter.js
import { atom } from 'nanostores'

interface IEditorStore {
  listKeys: any[]
}

export const editorStore = atom<IEditorStore>({
  listKeys: [1, 2, 3, 4]
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
