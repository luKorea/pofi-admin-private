<!--
 * @Author: korealu
 * @Date: 2022-02-10 10:17:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 16:22:38
 * @Description: file content
 * @FilePath: /pofi-admin/src/views/main/base/config/config.vue
-->
<template>
  <div class="hg-flex">
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
      <el-divider>多语言配置</el-divider>
      <el-row :gutter="12">
        <el-col :span="3">
          <div class="item-flex">
            <el-card>
              <span class="item-title">多语言选择</span>
              <div class="wrap">
                <template
                  v-for="item in languageBtnList"
                  :key="item.languageId"
                >
                  <div
                    class="item"
                    :class="item.languageId === languageId && 'active'"
                    @click="handleChangeLanguage(item.languageId)"
                  >
                    {{ item.name }}
                  </div>
                </template>
              </div>
            </el-card>
          </div>
        </el-col>
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
            <span class="item-title">内容</span>
            <hy-editor
              :ref="languageId + 'editor'"
              v-model:value="languageItem.value"
              fileTypeName="base/"
            ></hy-editor>
          </div>
        </el-col>
      </el-row>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'

import PageCountry from '@/components/page-country'
import HyEditor from '@/base-ui/editor'

import { usePageList, useStoreName, useOther } from './hooks/use-page-list'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { usePageLanguage } from '@/hooks/use-page-language'

import { searchFormConfig } from './page-config/search.config'
import { contentTableConfig } from './page-config/content.config'
import { modalConfig } from './page-config/modal.config'
import { useStore } from '@/store'
import { getItemData } from '@/service/common-api'

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
      languageIndex,
      languageId,
      resetLanguageList,
      languageBtnList
    ] = usePageLanguage({
      value: '',
      title: '',
      subTitle: ''
    })
    const languageItem = computed(() => {
      return languageList.value.find(
        (item: any) => item.languageId === languageId.value
      )
    })
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
    // 改变多语言
    const handleChangeLanguage = (id: any) => {
      console.log(id, '用户选中的值')
      languageId.value = id
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
            id: res.data.id,
            ...res.data
          }
          areaIds.value = res.data.areaIds
          languageList.value = res?.data?.sysConfigVoList
          languageId.value = res?.data?.sysConfigVoList[0].languageId
          handleEditData(res.data)
        }
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newClick)
    // 搜索处理
    const searchConfigReset = computed(() => {
      const groupItem = searchFormConfig.formItems.find(
        (item: any) => item.field === 'group'
      )
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
      languageIndex,
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

<style lang="less" scoped>
.wrap {
  width: 120px;
  display: flex;
  flex-direction: column;
  .item {
    height: 40px;
    line-height: 40px;
    width: 100%;
    cursor: pointer;
  }
  .item:hover {
    color: #409eff;
  }
  .active {
    background: #eaeaec;
    border-radius: 4px;
    color: #409eff;
  }
}
</style>
