<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-25 10:53:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/device/condition/condition.vue
-->
<template>
  <div class="condition">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="limit"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="limit"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row>
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">地区</span>
            <el-select
              placeholder="请选择国家地区，不选默认全部"
              style="width: 100%"
              clearable
              v-model="areaIds"
              multiple
              collapse-tags
              @change="handleChangeCountry($event)"
            >
              <el-option
                v-for="option in countryList"
                :key="option.id"
                :value="option.id"
                :label="option.name"
                >{{ option.name }}</el-option
              >
            </el-select>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageList } from './hooks/use-page-list'
// import { useStore } from '@/store'

export default defineComponent({
  name: 'deviceCondition',
  setup() {
    const storeTypeInfo = ref({
      actionName: 'conditionModule/getPageListAction',
      actionListName: 'conditionModule/pageListData',
      actionCountName: 'conditionModule/pageListCount',
      deleteAction: 'conditionModule/deletePageDataAction'
    })
    const operationName = ref({
      editName: 'conditionModule/editPageDataAction',
      createName: 'conditionModule/createPageDataAction'
    })
    const [pageContentRef] = usePageSearch()
    const [countryList] = usePageList()
    const otherInfo = ref<any>({})
    const areaIds = ref<any>([])
    // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
    watchEffect(() => {
      if (areaIds.value.length === 0) {
        const region: any[] = []
        countryList.value.forEach((item: any) => {
          region.push(item.id)
        })
        otherInfo.value = {
          region: region.toString()
        }
      }
    })
    const handleChangeCountry = (item: any) => {
      otherInfo.value = {
        region: item.toString()
      }
    }
    const newData = () => {
      areaIds.value = []
    }
    const editData = (item: any) => {
      otherInfo.value = {
        region: item.region, // 用户如果没有修改这个选项。使用默认值
        id: item.id
      }
      areaIds.value = item.region.split(',').map((item: any) => +item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    return {
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      countryList,
      areaIds,
      handleChangeCountry
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
