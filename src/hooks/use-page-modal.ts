/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 10:37:50
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-modal.ts
 */
import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    editCb && editCb(item)
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
  }
  return [pageModalRef, defaultInfo, handleNewData, handleEditData] as const
}
