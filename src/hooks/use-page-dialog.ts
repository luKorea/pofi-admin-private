/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 15:03:30
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-dialog.ts
 */
import { ref } from 'vue'
import PageDialog from '@/components/page-dialog'

type CallbackFn = (item?: any) => void

export function usePageDialog(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  const defaultInfo = ref({})
  const handleShowDialog = () => {
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
  }
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [
    pageDialogRef,
    handleShowDialog,
    defaultInfo,
    handleNewData,
    handleEditData
  ] as const
}
