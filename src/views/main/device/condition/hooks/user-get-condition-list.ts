/*
 * @Author: korealu
 * @Date: 2022-02-11 11:16:04
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-11 11:42:21
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/hooks/user-get-condition-list.ts
 */
import { ref, watch } from 'vue'
import { getConditionList } from '@/service/device/condition'
export function useGetConditionList() {
  // 1.双向绑定pageInfo
  const pageInfo = ref({ currentPage: 1, pageSize: 10 })
  watch(pageInfo, () => getPageData())
  const dataList = ref([])
  const dataCount = ref(0)
  // 2.发送网络请求
  const getPageData = (queryInfo: any = {}) => {
    getConditionList({
      currentPage: 1,
      pageSize: pageInfo.value.pageSize,
      ...queryInfo
    }).then((res) => {
      if (res.state) {
        const { rows, total } = res.data
        dataList.value = rows
        dataCount.value = total
      }
    })
  }
  getPageData()
  return [dataList, dataCount, pageInfo]
}
