<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:43:09
 * @LastEditors: korealu 643949593@qq.com
 * @LastEditTime: 2022-07-21 17:21:03
 * @Description:
 * @FilePath: /pofi-admin/src/components/page-dialog/src/page-dialog.vue
-->
<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :width="showWidth"
      top="20vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="showClose"
      destroy-on-close
      @close="closeDialog"
    >
      <template #title>
        <div style="color: rgb(180, 141, 222)">{{ title }}</div>
      </template>
      <!-- <div class="card-header">
        <span style="color: rgb(180, 141, 222)">{{ title }}</span>
      </div> -->
      <slot></slot>
      <!-- <el-card>
        <template #header>
          <div class="card-header">
            <span style="color: rgb(180, 141, 222)">{{ title }}</span>
          </div>
        </template>
        <slot></slot>
      </el-card> -->
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
    },
    showWidth: {
      type: String,
      default: '50%'
    },
    showClose: {
      type: Boolean,
      default: true
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
