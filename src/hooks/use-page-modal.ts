/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 10:48:16
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-modal.ts
 */
import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = (item: any) => {
    if (item) {
      const newItem = {} as any
      for (const key in item) {
        if (key === 'id') {
          newItem[key] = item[key]
        } else newItem[key] = ''
      }
      defaultInfo.value = { ...newItem }
    } else defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb(item)
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    console.log(defaultInfo.value, '编辑传递的值')
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData]
}
