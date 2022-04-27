<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-27 11:29:43
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/fusing/fusing.vue
-->
<template>
  <!-- TODO 暂时隐藏 -->
  <div class="hg-flex" v-if="1">
    <page-country
      ref="countryRef"
      :countryList="countryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="fusings"
      >
        <template #isState="scope">
          <el-button
            size="mini"
            :type="scope.row.status ? 'info' : 'primary'"
            @click="changeState(scope.row)"
            >{{ scope.row.status ? '关闭' : '打开' }}</el-button
          >
        </template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageCountry from '@/components/page-country'

import { usePageSearch } from '@/hooks/use-page-search'

import { usePageList, useStoreName, useOther } from './hooks/use-page-list'
import { contentTableConfig } from './config/content.config'
import { useStore } from '@/store'

import { successTip, errorTip, infoTipBox } from '@/utils/tip-info'

export default defineComponent({
  name: 'baseFusing',
  components: {
    PageCountry
  },
  setup() {
    const countryRef = ref()
    const [countryID] = useOther()
    const [pageContentRef] = usePageSearch()
    const selectCountryClick = (item: any) => {
      countryID.value = item.id
      pageContentRef?.value?.getPageData({
        rid: countryID.value
      })
    }
    const [storeTypeInfo] = useStoreName()
    const [countryList] = usePageList()

    const store = useStore()
    const changeState = (item: any) => {
      infoTipBox({
        title: '修改设备状态',
        message: `您确定将当前模块：${item.name} ${
          item.status ? '打开' : '关闭'
        }吗`
      }).then(() => {
        store
          .dispatch('baseFusingModule/editPageDataAction', {
            pageName: 'fusings',
            editData: {
              ...item,
              status: item.status ? 0 : 1,
              rid: countryID.value
            }
          })
          .then((res) => {
            pageContentRef?.value?.getPageData({
              rid: countryID.value
            })
            successTip(res)
          })
          .catch((err) => {
            errorTip(err)
          })
      })
    }
    return {
      pageContentRef,
      countryRef,
      storeTypeInfo,
      countryList,
      selectCountryClick,
      changeState,
      contentTableConfig
    }
  }
})
</script>
