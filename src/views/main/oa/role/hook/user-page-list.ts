/*
 * @Author: korealu
 * @Date: 2022-02-21 10:48:12
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-12 16:20:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/oa/role/hook/user-page-list.ts
 */
import { ref, computed, watch } from 'vue'
import { getPermissionTreeData } from '@/service/main/system/role'
import { getRouterTreeList } from '@/service/common'
import { ElTree } from 'element-plus'

export function usePermissionTree() {
  const selectPermissionList = ref<any>([])
  const selectRouterList = ref<any>([])
  getRouterTreeList().then((res: any) => {
    if (res.result === 0) {
      selectRouterList.value = res.data
    }
  })
  getPermissionTreeData().then((res: any) => {
    if (res.result === 0) {
      selectPermissionList.value = res.data.data
    }
  })
  return {
    selectPermissionList,
    selectRouterList
  }
}
// 对树形结构进行处理
export function useTreeOptions() {
  const { selectPermissionList, selectRouterList } = usePermissionTree()
  const treeData = computed(() => {
    const data = selectPermissionList.value.map((item: any) => {
      return { title: item.name, id: item.id }
    })
    return [...selectRouterList.value, ...data]
  })
  // 过滤树形结构
  const filterTree = ref('')
  watch(filterTree, (val) => elTreeRef.value!.filter(val))
  const handleFilterNode = (value: string, data: any) => {
    if (!value) return true
    return data.title.indexOf(value) !== -1
  }
  const editShowTree = ref<boolean>(false)
  const elTreeRef = ref<InstanceType<typeof ElTree>>()
  const otherInfo = ref<any>({
    pids: ''
  })
  // 获取用户选中的权限
  const handleCheckChange = (data1: any, data2: any) => {
    const checkedKeys = data2.checkedKeys
    const halfCheckedKeys = data2.halfCheckedKeys // 目前这个参数没有作用
    const menuList = [...halfCheckedKeys, ...checkedKeys]
    otherInfo.value = {
      ...otherInfo.value,
      pids: JSON.stringify(menuList)
    }
  }

  return {
    treeData,
    handleFilterNode,
    editShowTree,
    elTreeRef,
    filterTree,
    otherInfo,
    handleCheckChange
  }
}

export function useStoreName() {
  const storeTypeInfo = ref({
    actionName: 'oaRoleModule/getPageListAction',
    actionListName: 'oaRoleModule/pageListData',
    actionCountName: 'oaRoleModule/pageListCount',
    deleteAction: 'oaRoleModule/deletePageDataAction'
  })
  const operationName = ref({
    editName: 'oaRoleModule/editPageDataAction',
    createName: 'oaRoleModule/createPageDataAction'
  })

  return [storeTypeInfo, operationName]
}
