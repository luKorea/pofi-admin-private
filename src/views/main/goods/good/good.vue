<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-05-11 10:25:24
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/finance/tradeRecord/tradeRecord.vue
-->
<template>
  <div class="resource-good">
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
      @editBtnClick="editData"
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
      @changeSelect="handleChangeSelect"
    >
      <el-row :gutter="12">
        <!-- <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">U3D类型</span>
          </div>
        </el-col> -->
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
              :remote-method="handleGetResource"
              :loading="loading"
            >
              <el-option
                v-for="item in resourceList"
                :key="item.value"
                :label="item.pname"
                :value="item.moId"
                >{{ item.pname }}
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col v-bind="modalConfigRef.colLayout">
          <div class="item-flex">
            <span class="item-title">绑定模型名称</span>
            <el-input
              type="textarea"
              v-model="otherInfo.cmsContent"
              placeholder="模型名称"
              disabled
            ></el-input>
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
          <!-- 促销状态 -->
          <el-row :gutter="12">
            <!-- <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">促销开关</div>
                <el-select
                  v-model="languageItem.promotionSwitch"
                  placeholder="请选择促销状态"
                  clearable
                  style="width: 100%"
                >
                  <el-option label="开启中" :value="1">开启中</el-option>
                  <el-option label="暂停" :value="0">暂停</el-option>
                </el-select>
              </div>
            </el-col> -->
            <el-col :span="24">
              <div class="item-flex">
                <div class="item-title">
                  <!-- <span class="item-tip">*</span> -->
                  自定义
                </div>
                <el-input
                  v-model="languageItem.tagName"
                  placeholder="请输入自定义"
                  clearable
                  style="width: 100%"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <!-- 促销价格 -->
          <!-- <el-row :gutter="12">
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">
                  <span class="item-tip">*</span>
                  促销数量
                </div>
                <el-input-number
                  v-model="languageItem.promotionNum"
                  placeholder="请输入促销数量"
                  clearable
                  style="width: 100%"
                ></el-input-number>
              </div>
            </el-col>
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">促销价</div>
                <el-input-number
                  v-model="languageItem.promotionSale"
                  placeholder="请输入促销价"
                  clearable
                  style="width: 100%"
                ></el-input-number>
              </div>
            </el-col>
          </el-row> -->
          <!-- 促销时间 -->
          <el-row :gutter="12">
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">标签开始时间</div>
                <el-date-picker
                  type="datetime"
                  v-model="languageItem.tagStartTime"
                  placeholder="请输入标签开始时间"
                  clearable
                  value-format="YYYY-MM-DD HH:ss:mm"
                  style="width: 100%"
                ></el-date-picker>
              </div>
            </el-col>
            <el-col v-bind="modalConfigRef.colLayout">
              <div class="item-flex">
                <div class="item-title">标签结束时间</div>
                <el-date-picker
                  type="datetime"
                  v-model="languageItem.tagEndTime"
                  placeholder="请输入标签结束时间"
                  clearable
                  value-format="YYYY-MM-DD HH:ss:mm"
                  style="width: 100%"
                ></el-date-picker>
              </div>
            </el-col>
          </el-row>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  watchEffect,
  nextTick
} from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStoreName, useSetLanguage } from './hooks/use-page-list'
import { unityModalList } from '@/utils/select-list/map-resource-list'
import { mapResourceInfo } from '@/service/main/goods/function'
import { getItemData } from '@/service/common-api'
import { getCommonSelectList1 } from '@/service/common'
import { errorTip } from '@/utils/tip-info'

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
    const otherInfo = ref<any>()
    watchEffect(() => {
      // let list: any = []
      // languageList.value.forEach((item: any) => {
      //   list.push(item)
      // })
      otherInfo.value = {
        ...otherInfo.value,
        goodsTagJson: JSON.stringify(languageList.value)
      }
    })
    const newData = () => {
      otherInfo.value = {}
      resetLanguageList()
    }
    const getItem = (item: any) => {
      resetLanguageList()
      getItemData('goodItem', { snId: item.snId }).then(async (res) => {
        if (res.result === 0) {
          const data = res.data
          if (data?.goodsTagList?.length > 0) {
            const info = languageList.value.map((item: any) => {
              let res = data.goodsTagList.find((i: any) => i.lid === item.lid)
              if (res) {
                return {
                  ...item,
                  ...res
                }
              } else {
                return {
                  ...item
                }
              }
            })
            await nextTick()
            languageList.value = info
            languageId.value = info[0].lid
            // mapIconState(info, requiredField.value)
          }
          otherInfo.value = {
            ...otherInfo.value,
            content: JSON.stringify(data.content),
            cmsContent: res.data.cmsContent
          }
          handleEditData({
            ...data
          })
        }
      })
    }
    const editData = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        snId: item.snId,
        id: item.id
      }
      // handleChangeSelect({
      //   field: 'unityType',
      //   value: item.unityType
      // })
      getItem(item)
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData)
    const modalConfigRef = computed(() => {
      // const unitTypeItem = modalConfig.formItems.find(
      //   (item: any) => item.field === 'unityType'
      // )
      // unitTypeItem!.options = unityModalList.filter(
      //   (i: any) => i.value !== undefined
      // )
      return modalConfig
    })
    const resourceList = ref<any>([])
    const loading = ref<boolean>(false)
    const handleGetResource = (keyword: any) => {
      getCommonSelectList1(keyword, false)
        .then((res) => {
          if (res.result === 0) {
            resourceList.value = res.data
          } else errorTip(res.msg)
        })
        .finally(() => (loading.value = false))
    }
    const handleChangeSelect = (item: any) => {
      if (item.field == 'unityType') {
        mapResourceInfo(item.value).then((res) => {
          if (res.result === 0) {
            modalConfigRef.value.formItems.map((i: any) => {
              if (i.field === 'moId') {
                i!.options =
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
          }
        })
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
      editData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      handleChangeSelect,
      handleGetResource,
      loading,
      resourceList
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
