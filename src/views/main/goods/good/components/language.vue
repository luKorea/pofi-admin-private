<!--
 * @Author: your name
 * @Date: 2022-04-24 12:03:42
 * @LastEditTime: 2022-04-24 12:07:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/goods/good/components/language.vue
-->
<template>
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
          分类名称
        </div>
        <el-input
          v-model="languageItem.name"
          placeholder="请输入分类名称"
          required
          clearable
        ></el-input>
      </div>
      <div class="item-flex">
        <span class="item-title">描述</span>
        <el-input
          type="textarea"
          :rows="3"
          v-model="languageItem.desc"
          placeholder="请输入描述"
          clearable
        ></el-input>
      </div>
    </template>
  </page-language>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSetLanguage } from '../hooks/use-page-list'

export default defineComponent({
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
    return {
      // 多语言编辑
      languageList,
      languageId,
      languageItem,
      languageBtnList,
      handleChangeLanguage,
      resetLanguageList,
      requiredField,
      mapIconState
    }
  }
})
</script>

<style scoped></style>
