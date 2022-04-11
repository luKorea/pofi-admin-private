/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-11 12:19:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-modal.ts
 */
import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = (item: any, other = false) => {
    // 修改新增函数执行顺序, other参数控制用户点击新增时是否传递参数，默认不传递
    newCb && newCb(item)
    if (other) {
      console.log(item, 'item')
      defaultInfo.value = { ...item }
    } else defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
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
