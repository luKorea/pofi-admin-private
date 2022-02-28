<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:30:45
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 17:37:18
 * @Description: file content
 * @FilePath: /pofi-admin/src/components/page-search/src/page-search.vue
-->
<template>
  <el-card>
    <div class="search-title">
      <div>高级检索</div>
      <div
        class="header"
        style="cursor: pointer"
        @click="changeFormVisible = !changeFormVisible"
      >
        <span>{{ changeFormVisible ? '收缩' : '展开' }}</span>
        <el-icon>
          <template v-if="changeFormVisible">
            <arrow-up />
          </template>
          <template v-else>
            <arrow-down />
          </template>
        </el-icon>
      </div>
    </div>
    <hy-form
      v-if="changeFormVisible"
      v-bind="searchFormConfig"
      v-model="formData"
    >
      <!-- <template #header>
        <span class="hg-flex">条件筛选</span>
      </template> -->
      <template #footer>
        <div class="handle-btns">
          <el-button
            size="mini"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  name: 'PageSearch',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm,
    ArrowUp,
    ArrowDown
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const changeFormVisible = ref<any>(true)
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      // 修改对象里面的属性
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三: 当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      changeFormVisible,
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.search-title {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgb(182, 176, 176);
}
.page-search {
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
}
.header {
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  cursor: pointer;
}
.handle-btns {
  display: flex;
  justify-content: flex-end;
  /* text-align: right;
  padding: 0 50px 20px 0; */
}
</style>
