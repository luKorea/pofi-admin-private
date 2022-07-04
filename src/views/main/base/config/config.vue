<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-04 17:40:23
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/config.vue
-->
<template>
  <div class="hg-flex" v-if="1">
    <page-country
      ref="countryRef"
      :countryList="handleCountryList"
      @selectCountryItem="selectCountryClick"
    ></page-country>
    <div class="page-country-wrap">
      <page-search
        v-if="isAdmin"
        :searchFormConfig="searchConfigReset"
        @resetBtnClick="handleResetBtnClick"
        @queryBtnClick="handleQueryBtnClick"
      />
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="records"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEdit"
      >
        <template #isState="scope">
          <span>{{ scope.row.state ? '启用' : '禁用' }}</span>
        </template>
        <template #isShow="scope">
          <span>{{ scope.row.state ? '显示' : '隐藏' }}</span>
        </template>
      </page-content>
    </div>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="records"
      :modalConfig="modalConfigRef"
      :operationName="operationName"
      :otherInfo="otherInfo"
      @changeSelect="handleSelectChange"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfigRef.colLayout">
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
      <page-language
        :languageList="languageList"
        :languageId="languageId"
        :languageBtnList="languageBtnList"
        @changeLanguage="handleChangeLanguage"
      >
        <template #formItem>
          <div class="item-flex">
            <span class="item-title">标题</span>
            <el-input
              v-model="languageItem.title"
              placeholder="请输入标题"
            ></el-input>
          </div>
          <div class="item-flex">
            <span class="item-title">副标题</span>
            <el-input
              v-model="languageItem.subTitle"
              placeholder="请输入副标题"
            ></el-input>
          </div>
          <div class="item-flex">
            <div class="item-title">
              <span class="item-tip">*</span>
              内容
            </div>
            <template v-if="!showEditor">
              <el-input
                v-model="languageItem.value"
                type="textarea"
                :rows="3"
              ></el-input>
            </template>
            <hy-editor
              v-show="showEditor"
              ref="editorRef"
              v-model:value="languageItem.value"
              fileTypeName="configName/"
            ></hy-editor>
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect, nextTick } from 'vue'

import PageCountry from '@/components/page-country'
import {
  usePageList,
  useStoreName,
  useOther,
  useSetLanguage
} from './hooks/use-page-list'

import { useMapCountry } from '@/hooks/use-page-side-country'
import { usePageModal } from '@/hooks/use-page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { useStore } from '@/store'
import { getItemData } from '@/service/common-api'
import HyEditor from '@/base-ui/editor'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'baseConfig',
  components: {
    PageCountry,
    HyEditor
  },
  setup() {
    const [
      editorRef,
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage,
      requiredField,
      fieldId,
      mapIconState
    ] = useSetLanguage()
    const store = useStore()
    const isAdmin = computed(() => store.state.login.isAdmin)
    const [, otherInfo] = useOther()
    const [storeTypeInfo, operationName] = useStoreName()
    const [countryList, groupList, classificationList] = usePageList()
    const areaIds = ref<any>([])
    // 判断用户是否有选择地区，没有的话将下拉数据循环并发送到后台
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        sysConfigJson: JSON.stringify(languageList.value)
      }
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
    })
    const handleChangeCountry = (item: any[]) => {
      const all: any[] = []
      const check = item.find((i: any) => i === -1)
      if (check === -1) {
        countryList.value
          .filter((i: any) => i.id !== -1)
          .forEach((item: any) => {
            all.push(item.id)
          })
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: all.toString()
        }
        areaIds.value = all
      } else {
        otherInfo.value = {
          ...otherInfo.value,
          areaIds: item.toString()
        }
      }
    }
    const newClick = () => {
      areaIds.value = []
      showEditor.value = false
      resetLanguageList()
    }
    const handleEdit = (item: any) => {
      resetLanguageList()
      showEditor.value = item.type === 'editor'
      getItemData('baseConfig', {
        id: item.id,
        language: 1
      }).then(async (res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            areaIds: res.data.areaIds, // 用户如果没有修改这个选项。使用默认值
            id: res.data.id
          }
          areaIds.value = res.data.areaIds ?? []
          if (res.data.sysConfigVoList && res.data.sysConfigVoList.length > 0) {
            const info = languageList.value.map((item: any) => {
              let result = res.data.sysConfigVoList.find(
                (i: any) => i.languageId === item.languageId
              )
              if (result) {
                return {
                  ...item,
                  ...result
                }
              } else {
                return {
                  ...item
                }
              }
            })
            await nextTick()
            languageList.value = info
            languageId.value = info[0].languageId
            mapIconState(info, requiredField.value, fieldId.value)
          }
          handleEditData(res.data)
        } else errorTip(res.msg)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newClick)
    // 搜索处理
    const searchConfigReset = computed(() => {
      const groupItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'group'
      )
      console.log(groupList.value)
      groupItem!.options = groupList.value.map((item: any) => ({
        title: item.dec,
        value: item.group
      }))
      return searchFormConfig
    })
    // 表单
    const modalConfigRef = computed(() => {
      // 超级管理员拥有分类分组选项，普通用户没有，后续增加
      // const countryItem = modalConfig.formItems.find(
      //   (item: any) => item.field === 'areaIds'
      // )
      const groupItem = modalConfig.formItems.find(
        (item: any) => item.field === 'group'
      )
      const typeItem = modalConfig.formItems.find(
        (item: any) => item.field === 'type'
      )
      // countryItem!.options = countryList.value.map((item: any) => ({
      //   title: item.name,
      //   value: item.id
      // }))
      groupItem!.options = groupList.value.map((item: any) => ({
        title: item.dec,
        value: item.group
      }))
      groupItem!.isHidden = !isAdmin.value
      typeItem!.options = classificationList.value.map((item: any) => ({
        title: item.dec,
        value: item.type
      }))
      typeItem!.isHidden = !isAdmin.value
      return modalConfig
    })
    const showEditor = ref<boolean>(false)
    const handleSelectChange = (data: any) => {
      if (data.field === 'type' && data.value === 'editor') {
        showEditor.value = true
      } else if (data.field === 'type' && data.value !== 'editor') {
        showEditor.value = false
      }
    }
    return {
      ...useMapCountry(false),
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      areaIds,
      handleChangeCountry,
      isAdmin,
      storeTypeInfo,
      countryList,
      groupList,
      searchConfigReset,
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEdit,
      handleEditData,
      modalConfigRef,
      operationName,
      otherInfo,
      handleSelectChange,
      showEditor
    }
  }
})
</script>

<style lang="less" scoped></style>
