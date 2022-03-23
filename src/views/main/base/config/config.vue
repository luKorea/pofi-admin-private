<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-23 17:17:14
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
          <el-col :span="21">
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
              <hy-editor
                v-model:value="languageItem.value"
                :fileTypeName="editorFileName"
              ></hy-editor>
            </div>
          </el-col>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'

import PageCountry from '@/components/page-country'
import {
  usePageList,
  useStoreName,
  useOther,
  useSetLanguage
} from './hooks/use-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { searchFormConfig } from './page-config/search.config'
import { contentTableConfig } from './page-config/content.config'
import { modalConfig } from './page-config/modal.config'
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
    const editorRules = ref([
      {
        require: true,
        message: '请输入内容',
        trigger: 'blur'
      }
    ])
    const [
      languageList,
      languageId,
      resetLanguageList,
      languageBtnList,
      languageItem,
      handleChangeLanguage
    ] = useSetLanguage()
    const store = useStore()
    const isAdmin = computed(() => store.state.login.isAdmin)
    const countryRef = ref()
    const [countryID, otherInfo] = useOther()
    const [storeTypeInfo, operationName] = useStoreName()
    const [countryList, groupList, classificationList] = usePageList()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const areaIds = ref<any>([])
    const handleCountryList = computed(() => {
      const list = [
        {
          name: '全部',
          id: -999
        },
        ...countryList.value
      ]
      return list
    })
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
    const handleChangeCountry = (item: any) => {
      otherInfo.value = {
        ...otherInfo.value,
        areaIds: item.toString()
      }
    }
    const newClick = () => {
      areaIds.value = []
      resetLanguageList()
    }
    const handleEdit = (item: any) => {
      getItemData('baseConfig', {
        id: item.id,
        language: 1
      }).then((res: any) => {
        if (res.result === 0) {
          otherInfo.value = {
            areaIds: res.data.areaIds, // 用户如果没有修改这个选项。使用默认值
            id: res.data.id
          }
          areaIds.value = res.data.areaIds
          if (res.data.sysConfigVoList && res.data.sysConfigVoList.length > 0) {
            languageList.value = res?.data?.sysConfigVoList
            languageId.value = res?.data?.sysConfigVoList[0].languageId
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
    const copyQueryInfo = ref({})
    const selectCountryClick = (item: any) => {
      countryID.value = item.id
      handleQueryClick({
        ...copyQueryInfo.value,
        rid: countryID.value
      })
    }
    const handleQueryBtnClick = (queryInfo: any) => {
      copyQueryInfo.value = queryInfo
      handleQueryClick({
        ...queryInfo,
        rid: countryID.value
      })
    }
    // 刷新时重新选择第一条数据
    const handleResetBtnClick = () => {
      countryRef.value.currentIndex = 0
      countryID.value = '-999'
      handleResetClick()
    }
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
    return {
      // 多语言编辑
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      areaIds,
      handleChangeCountry,
      handleCountryList,
      isAdmin,
      countryRef,
      editorRules,
      storeTypeInfo,
      countryList,
      groupList,
      selectCountryClick,
      pageContentRef,
      searchConfigReset,
      handleResetClick,
      handleResetBtnClick,
      handleQueryClick,
      handleQueryBtnClick,
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEdit,
      handleEditData,
      modalConfigRef,
      operationName,
      otherInfo
    }
  }
})
</script>

<style lang="less" scoped></style>
