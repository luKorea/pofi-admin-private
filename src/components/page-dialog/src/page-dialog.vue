<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:43:09
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 11:18:12
 * @Description:
 * @FilePath: /pofi-admin/src/components/page-dialog/src/page-dialog.vue
-->
<template>
  <div class="page-dialog">
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="40%"
      top="8vh"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageDialog',
  setup() {
    const dialogVisible = ref(false)
    return {
      dialogVisible
    }
  }
})
</script>

<style scoped></style>
