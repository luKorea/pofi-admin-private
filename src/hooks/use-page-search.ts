/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:10
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-15 14:58:23
 * @Description: file content
 * @FilePath: /pofi-admin/src/hooks/use-page-search.ts
 */
import { ref, computed } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetClick = () => pageContentRef.value?.getPageData()
  const handleQueryClick = (queryInfo: any) =>
    pageContentRef.value?.getPageData(queryInfo)
  // 前端搜索
  const handleQueryFrontClick = (tableData: any, search: any, type: string) => {
    return tableData.filter((data: any) => {
      console.log(search.value)
      !search || data[type].toLowerCase().includes(search.toLowerCase())
    })
  }
  return [
    pageContentRef,
    handleResetClick,
    handleQueryClick,
    handleQueryFrontClick
  ] as const
}
