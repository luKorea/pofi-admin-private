<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-24 13:41:41
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <!-- TODO 暂时隐藏，多语言 -->
  <div class="resource-good" v-if="0">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="goods"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #isUnity="{ row }">
        <span>{{
          $filters.formatSelectTitle(row.unityType, unityModalList)
        }}</span>
      </template>
      <template #isState="{ row }">
        <span>{{ row.show == 1 ? '已上架' : '已下架' }}</span>
      </template>
      <template #isActive="{ row }">
        <span>{{ row.promotionSwitch == 1 ? '开启中' : '暂停' }}</span>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="goods"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">绑定模型</span>
            <el-select
              style="width: 100%"
              v-model="otherInfo.moId"
              filterable
              remote
              reserve-keyword
              clearable
              placeholder="请输入模型资源id或名称搜索"
              :remote-method="handleRemoteMethodToMoId"
              :loading="loading"
            >
              <el-option
                v-for="item in modelList"
                :key="item.value"
                :label="item.title"
                :value="item.value"
                >{{ item.title }}
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- 多语言区域 -->
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <!-- 促销价格 -->
          <el-row :gutter="12">
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">
                  <span class="item-tip">*</span>
                  促销数量
                </div>
                <el-input-number
                  v-model="languageItem.promotionNum"
                  placeholder="请输入促销数量"
                  :min="0"
                  clearable
                  style="width: 100%"
                ></el-input-number>
              </div>
            </el-col>
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">促销价</div>
                <el-input-number
                  v-model="languageItem.discount"
                  placeholder="请输入促销价"
                  :min="0"
                  clearable
                  style="width: 100%"
                ></el-input-number>
              </div>
            </el-col>
          </el-row>
          <!-- 促销时间 -->
          <el-row :gutter="12">
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">促销开始时间</div>
                <el-date-picker
                  type="datetime"
                  v-model="languageItem.promotionStartTime"
                  placeholder="请输入促销开始时间"
                  clearable
                  value-format="YYYY-MM-DD HH:ss:mm"
                  style="width: 100%"
                ></el-date-picker>
              </div>
            </el-col>
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">促销结束时间</div>
                <el-date-picker
                  type="datetime"
                  v-model="languageItem.promotionEndTime"
                  placeholder="请输入促销结束时间"
                  clearable
                  value-format="YYYY-MM-DD HH:ss:mm"
                  style="width: 100%"
                ></el-date-picker>
              </div>
            </el-col>
          </el-row>
          <!-- 促销状态 -->
          <el-row :gutter="12">
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">商品状态</div>
                <el-select
                  v-model="languageItem.promotionSwitch"
                  placeholder="请选择商品状态"
                  clearable
                  style="width: 100%"
                >
                  <el-option label="开启中" value="1">上架</el-option>
                  <el-option label="暂停" value="0">下架</el-option>
                </el-select>
              </div>
            </el-col>
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">促销开关</div>
                <el-select
                  v-model="languageItem.promotionSwitch"
                  placeholder="请选择促销状态"
                  clearable
                  style="width: 100%"
                >
                  <el-option label="开启中" value="1">开启中</el-option>
                  <el-option label="暂停" value="0">暂停</el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName, useSetLanguage } from './hooks/use-page-list'
import {
  unityModalList,
  activeLabelList
} from '@/utils/select-list/map-resource-list'
import { getCommonSelectList } from '@/service/common'

export default defineComponent({
  name: 'resourceGood',
  setup() {
    const [
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      mapIconState
    ] = useSetLanguage()
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 编辑新增操作
    const otherInfo = ref<any>({
      moId: ''
    })
    const newData = () => {
      otherInfo.value = {
        moId: ''
      }
      resetLanguageList()
    }
    const editData = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        id: item.id
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    const modalConfigRef = computed(() => {
      const tagItem = modalConfig.formItems.find(
        (item: any) => item.field === 'tagType'
      )
      tagItem!.options = activeLabelList
      return modalConfig
    })
    const modelList = ref<any>([])
    const loading = ref<boolean>(false)
    const handleRemoteMethodToMoId = (item: any) => {
      if (item !== '') {
        loading.value = true
        getCommonSelectList('searchMoIdType', { keyword: item }, false)
          .then((res) => {
            if (res.result === 0) {
              modelList.value =
                res.data && res.data.length > 0
                  ? res.data.map((item: any) => {
                      return {
                        title: item.pname,
                        value: item.moId
                      }
                    })
                  : []
            }
          })
          .finally(() => (loading.value = false))
      }
    }
    return {
      unityModalList,
      // 多语言编辑
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      searchFormConfig,
      handleResetClick,
      handleQueryClick,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      modelList,
      handleRemoteMethodToMoId,
      loading
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
