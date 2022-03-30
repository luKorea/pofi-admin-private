/*
 * @Author: korealu
 * @Date: 2022-02-17 11:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-15 09:56:08
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/head/hooks/use-page-list.ts
 */
import { ref, computed } from 'vue'
import { useStore } from '@/store'

export function usePageData() {
  const store = useStore()
  const pageName = ref<string>('userModifys')
  const [storeTypeInfo] = useStoreName()
  const getData = () => {
    store.dispatch(storeTypeInfo.value.actionName, {
      pageName: 'userModifys'
    })
  }
  const dataList = computed(() => {
    return store.getters[storeTypeInfo.value.actionListName](pageName.value)
  })
  const dataCount = computed(() => {
    return store.getters[storeTypeInfo.value.actionCountName](pageName.value)
  })
  getData()
  return [dataList, dataCount, getData, pageName] as any
}
export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'auditUserModifyModule/getPageListAction',
    actionListName: 'auditUserModifyModule/pageListData',
    actionCountName: 'auditUserModifyModule/pageListCount',
    deleteAction: 'auditUserModifyModule/deletePageDataAction',
    sortAction: 'auditUserModifyModule/sortPageDataAction'
  })
  const operationName = ref({
    editName: 'auditUserModifyModule/editPageDataAction',
    createName: 'auditUserModifyModule/createPageDataAction'
  })
  return [storeTypeInfo, operationName] as any
}

export function useImageUpload() {
  // 上传操作
  const imgLimit = ref(1)
  const imgList = ref<any>([])
  return [imgLimit, imgList]
}
