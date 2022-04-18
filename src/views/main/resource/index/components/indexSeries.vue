<template>
  <div class="resource-classify">
    <hy-card title="系列">
      <el-input
        v-model="filterText"
        clearable
        class="hg-mb-1"
        placeholder="输入搜索"
      />
      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="dataList"
        :props="{
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        }"
        :filter-node-method="filterNode"
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span
            class="custom-tree-node"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            "
          >
            <span>{{ node.label }}</span>
            <span v-if="+data.parent === 0">
              <el-button
                type="text"
                size="mini"
                @click="handleNewClick(node.label, data.id)"
                >新增</el-button
              >
            </span>
            <span v-else>
              <el-button type="text" size="mini" @click="handleEditClick(data)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="mini"
                style="color: rgb(245, 108, 108)"
                @click="handleDeleteClick(data)"
                >删除</el-button
              >
            </span>
          </span>
        </template>
      </el-tree>
      <page-content
        v-show="false"
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        :storeTypeInfo="storeTypeInfo"
        pageName="indexSeries"
      >
      </page-content>
    </hy-card>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="indexSeries"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
      <el-row :gutter="12">
        <el-col v-bind="modalConfig.colLayout">
          <div class="item-flex">
            <span class="item-title">当前节点</span>
            <el-input v-model="selectName" disabled></el-input>
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
            <div class="item-title">
              <span class="item-tip">*</span>
              分类页名称
            </div>
            <el-input
              v-model="languageItem.name"
              placeholder="请输入分类页名称"
              required
              clearable
            ></el-input>
          </div>
        </template>
      </page-language>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, watchEffect } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStoreName, useSetLanguage } from './hooks/use-page-list'
import { useStore } from '@/store'
import HyCard from '@/base-ui/card/index'
import { ElTree } from 'element-plus'
import { getItemData } from '@/service/common-api'
import { errorTip, infoTipBox } from '@/utils/tip-info'
export default defineComponent({
  name: 'indexSeriesComponent',
  components: {
    HyCard
  },
  emits: ['nodeClick'],
  setup(_, { emit }) {
    const [
      editorRef,
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
    const otherInfo = ref<any>({})
    watchEffect(() => {
      otherInfo.value = {
        ...otherInfo.value,
        classifyJson: JSON.stringify(languageList.value)
      }
    })
    const store = useStore()
    const dataList = computed(() => {
      return store.getters['resourceIndexSeriesModule/pageListData'](
        'indexSeries'
      )
    })
    const filterText = ref('')
    const treeRef = ref<InstanceType<typeof ElTree>>()
    watch(filterText, (val) => {
      treeRef.value!.filter(val)
    })
    const filterNode = (value: string, data: any) => {
      if (!value) return true
      return data.name.includes(value)
    }
    // 用户选中的节点名称
    const selectName = ref<any>()
    const handleNewClick = (name: any, parent: any) => {
      selectName.value = name
      otherInfo.value = {
        ...otherInfo.value,
        parent: parent
      }
      modalConfig.formItems.map((i: any) => {
        if (i.field === 'index') i!.isHidden = true
      })
      resetLanguageList()
      handleNewData({})
    }
    const handleEditClick = (item: any) => {
      getItemData('homeSeriesItem', { id: item.id }).then((res) => {
        if (res.result === 0) {
          selectName.value = item.name
          otherInfo.value = {
            ...otherInfo.value,
            parent: item.parent,
            id: item.id
          }
          modalConfig.formItems.map((i: any) => {
            if (i.field === 'index') i!.isHidden = false
          })
          if (res.data.classifyList && res.data.classifyList.length > 0) {
            languageList.value = res.data.classifyList
            languageId.value = res?.data?.classifyList[0].lid
            mapIconState(res.data.classifyList, requiredField.value)
          }
          handleEditData(item)
        } else errorTip(res.msg)
      })
    }
    const handleDeleteClick = (item: any) => {
      console.log(item)
      infoTipBox({
        title: '提示',
        message: `删除[${item.name}]系列, 是否继续?`
      })
        .then(() => {
          store.dispatch('resourceIndexSeriesModule/deletePageDataAction', {
            pageName: 'indexSeries',
            queryInfo: {
              id: item.id
            }
          })
        })
        .catch((err) => console.log(err))
    }
    const handleNodeClick = (item: any) => {
      emit('nodeClick', {
        library: item.parent,
        category: item.id
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal()
    return {
      filterText,
      treeRef,
      filterNode,
      selectName,
      // 多语言编辑
      editorRef,
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      storeTypeInfo,
      contentTableConfig,
      pageContentRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      operationName,
      otherInfo,
      modalConfig,
      dataList,
      handleEditClick,
      handleNewClick,
      handleDeleteClick,
      handleNodeClick
    }
  }
})
</script>

<style scoped module lang="less">
.red {
  color: red;
}
</style>
