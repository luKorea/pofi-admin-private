/*
 * @Author: korealu
 * @Date: 2022-02-21 10:48:12
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-22 10:14:35
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/user/hook/user-page-list.ts
 */
import { ref } from 'vue'

import { getRolesList } from '@/service/common'

export function useRoleList() {
  const roleList = ref<any>([])
  getRolesList().then((res: any) => {
    if (res.result === 0) {
      roleList.value = res.data
    }
  })
  return [roleList]
}
export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'oaUserModule/getPageListAction',
    actionListName: 'oaUserModule/pageListData',
    actionCountName: 'oaUserModule/pageListCount',
    deleteAction: 'oaUserModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'oaUserModule/editPageDataAction',
    createName: 'oaUserModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}
