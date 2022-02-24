<!--
 * @Author: korealu
 * @Date: 2021-08-17 23:16:12
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-24 17:03:24
 * @Description: file content
 * @FilePath: /pofi-admin/src/base-ui/descriptions/src/descriptions.vue
-->
<template>
  <div class="description">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(itemData, index) in tableData" :key="index">
        <el-descriptions-item>
          <template #label> {{ itemData.name }} </template>
          <el-tag size="small">{{ itemData.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 1
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>
