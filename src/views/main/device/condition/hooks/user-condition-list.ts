/*
 * @Author: korealu
 * @Date: 2022-02-11 11:16:04
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-15 17:52:36
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/hooks/user-condition-list.ts
 */
import { ref, watch } from 'vue'
import {
  getConditionList,
  addCondition,
  editCondition,
  removeCondition
} from '@/service/device/condition'
import { getCountrySelectList } from '@/service/common'
import { errorTip, infoTipBox } from '@/utils/tip-info'
export function useGetConditionList() {
  // 1.双向绑定pageInfo
  const pageInfo = ref({ currentPage: 1, pageSize: 10 })
  watch(pageInfo, () => getPageData())
  const dataList = ref([])
  const dataCount = ref(0)
  const countryList: any = ref([])
  // 2.发送网络请求
  const getPageData = (queryInfo: any = {}) => {
    getConditionList({
      currentPage: pageInfo.value.currentPage,
      pageSize: pageInfo.value.pageSize,
      ...queryInfo
    }).then((res) => {
      if (res.state) {
        const { rows, total } = res.data
        dataList.value = rows
        dataCount.value = total
      } else errorTip(res.msg)
    })
  }
  getPageData()

  // 增删改操作
  const saveData = (data: any) => {
    addCondition(data).then((res) => {
      if (res.state) {
        getPageData()
      } else {
        errorTip(res.msg)
      }
    })
  }
  const updateData = (data: any) => {
    editCondition(data).then((res) => {
      if (res.state) {
        getPageData()
      } else {
        errorTip(res.msg)
      }
    })
  }

  const deleteData = (data: any) => {
    infoTipBox({
      message: '是否要删除方案名称为: ' + data.name,
      title: '删除限制条件',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      iconType: 'warning'
    }).then(() => {
      removeCondition({ id: data.id }).then((res) => {
        if (res.state) {
          getPageData()
        } else {
          errorTip(res.msg)
        }
      })
    })
  }

  // 获取国家下拉列表
  const getCountryList = () => {
    getCountrySelectList().then((res: any) => {
      if (res.state) {
        const { rows } = res.data
        countryList.value = rows
      } else errorTip(res.msg)
    })
  }
  getCountryList()

  return [
    dataList,
    dataCount,
    countryList,
    pageInfo,
    saveData,
    updateData,
    deleteData
  ] as const
}
