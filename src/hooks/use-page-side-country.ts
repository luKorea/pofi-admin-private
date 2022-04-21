import { errorTip } from '@/utils/tip-info'
import { ref, computed } from 'vue'
import { getCommonSelectList } from '@/service/common'
import { usePageSearch } from '@/hooks/use-page-search'

export function useCountryList() {
  const countryList = ref<any>([])
  const getCountryList = () => {
    getCommonSelectList('country').then((res) => {
      if (res.state) {
        countryList.value.push(...res.data.rows)
      } else errorTip(res.msg)
    })
  }
  getCountryList()
  return [countryList]
}

/**
 *
 * @param showAll 用来判断当前侧边栏是否需要显示全选
 * @returns
 */
export function useMapCountry(showAll = true) {
  const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
  const [countryList] = useCountryList()
  const handleCountryList = computed(() => {
    const list = showAll
      ? [
          {
            name: '全部',
            id: -999
          },
          ...countryList.value
        ]
      : countryList.value
    return list
  })
  // 侧边国家
  const countryID = ref<any>(-999)
  const nodeInfo = ref<any>()
  const countryRef = ref()
  const copyQueryInfo = ref({})
  const selectCountryClick = (item: any) => {
    countryID.value = item.id
    handleQueryClick({
      ...copyQueryInfo.value,
      rid: countryID.value
    })
  }
  const selectNodeClick = (item: any) => {
    nodeInfo.value = item
    handleQueryClick({
      ...copyQueryInfo.value,
      ...nodeInfo.value
    })
  }
  const handleQueryBtnClick = (queryInfo: any) => {
    copyQueryInfo.value = queryInfo
    handleQueryClick({
      ...queryInfo,
      ...nodeInfo.value,
      rid: countryID.value
    })
  }
  // 刷新时重新选择第一条数据
  const handleResetBtnClick = () => {
    countryRef.value.currentIndex = 0
    countryID.value = '-999'
    nodeInfo.value = {}
    handleResetClick()
  }
  return {
    pageContentRef,
    handleCountryList,
    countryRef,
    selectCountryClick,
    handleQueryBtnClick,
    handleResetBtnClick,
    selectNodeClick
  }
}
