<!--
 * @Author: korealu
 * @Date: 2022-02-16 16:58:51
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-14 14:45:00
 * @Description: 完成
 * @FilePath: /pofi-admin/src/views/main/base/language/language.vue
-->
<template>
  <div class="base-languages">
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :storeTypeInfo="storeTypeInfo"
      pageName="languages"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #isState="scope">
        <el-button
          size="mini"
          :type="scope.row.state ? 'primary' : 'info'"
          @click="changeState(scope.row)"
          >{{ scope.row.state ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="languages"
      :modalConfig="modalConfig"
      :operationName="operationName"
      :otherInfo="otherInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStoreName } from './hooks/use-page-list'
import { useStore } from '@/store'
import { infoTipBox, successTip, errorTip } from '@/utils/tip-info'
export default defineComponent({
  name: 'baseLanguage',
  setup() {
    const [storeTypeInfo, operationName] = useStoreName()
    const [pageContentRef, handleResetClick] = usePageSearch()
    const otherInfo = ref<any>({})
    const newData = () => {
      otherInfo.value = {}
    }
    const editData = (item: any) => {
      otherInfo.value = {
        id: item.id
      }
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newData, editData)
    const store = useStore()
    const changeState = (item: any) => {
      infoTipBox({
        title: '修改语言状态',
        message: `您确定将当前语言为为${item.name}的状态修改为:${
          item.state ? '禁用' : '启用'
        }吗`
      }).then(() => {
        store
          .dispatch('baseLanguageModule/editPageDataAction', {
            pageName: 'languages',
            editData: {
              ...item,
              state: item.state ? 0 : 1
            }
          })
          .then((res) => {
            handleResetClick()
            successTip(res)
          })
          .catch((err) => {
            errorTip(err)
          })
      })
    }
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
      changeState
    }
  }
})
</script>

<style scoped module>
.red {
  color: red;
}
</style>
