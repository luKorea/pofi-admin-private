/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 16:45:00
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-search.ts
 */
import { ref, computed } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => pageContentRef.value?.getPageData()
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  // 前端搜索
  const handleQueryFrontClick = (
    tableData: any,
    queryInfo: any,
    type: string
  ) => {
    console.log(type)
    return computed(() => {
      return tableData.filter((data: any) => {
        !queryInfo.search ||
          data.id.toLowerCase().includes(queryInfo.search.toLowerCase())
      })
    })
  }
  return [
    pageContentRef,
    handleResetClick,
    handleQueryClick,
    handleQueryFrontClick
  ] as const
}
