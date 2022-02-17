<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:43:09
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-17 17:24:16
 * @Description:
 * @FilePath: /pofi-admin/src/components/page-dialog/src/page-dialog.vue
-->
<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="40%"
      top="8vh"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      @close="closeDialog"
    >
      <template #title v-if="showTitle">
        <div style="color: #409eff">{{ title }}</div>
        <el-divider></el-divider>
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageDialog',
  props: {
    title: {
      type: String,
      default: '操作'
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeDialog'],
  setup(_, { emit }) {
    const dialogVisible = ref(false)
    const closeDialog = () => {
      emit('closeDialog')
    }
    return {
      dialogVisible,
      closeDialog
    }
  }
})
</script>

<style scoped></style>
