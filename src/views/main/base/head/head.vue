<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 10:40:59
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/base/head/head.vue
-->
<template>
  <div class="base-head">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="heads"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #slotState="scope">
        <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
      </template>
      <template #slotUrl="scope">
        <el-link :href="scope.row.url" target="_blank">{{
          scope.row.url
        }}</el-link>
      </template>
      <template #slotImage="scope">
        <page-image :img-src="scope.row.url"></page-image>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="heads"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
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
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">图片上传</span>
            <hy-upload
              :limit="imgLimit"
              fileTypeName="base/"
              v-model:value="imgList"
            ></hy-upload>
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
import {
  usePageList,
  useStoreName,
  useImageUpload
} from './hooks/use-page-list'
import hyUpload from '@/base-ui/upload'
import { mapImageToObject } from '../../../../utils/index'

export default defineComponent({
  name: 'baseHeader',
  components: {
    hyUpload
  },
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef] = usePageSearch()
    const [countryList] = usePageList()
    const [imgLimit, imgList] = useImageUpload()
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
          ...otherInfo.value,
          areaIds: region.toString()
        }
      }
      if (imgList.value.length > 0) {
        otherInfo.value = {
          ...otherInfo.value,
          url: imgList.value[0].url
        }
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          url: undefined
        }
      }
    })
    const handleChangeCountry = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item.toString()
      }
    }
    const newData = () => {
      imgList.value = []
      areaIds.value = []
    }
    const editData = (item: any) => {
      imgList.value = []
      if (item.url) {
        imgList.value.push(mapImageToObject(item.url))
      }
      otherInfo.value = {
        areaIds: item.areaIds, // 用户如果没有修改这个选项。使用默认值
        id: item.id,
        ...item
      }
      areaIds.value = item.areaIds
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
      handleChangeCountry,
      imgLimit,
      imgList
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
