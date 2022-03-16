<!--
 * @Author: korealu
 * @Date: 2022-02-08 09:43:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-16 12:07:43
 * @Description:
 * @FilePath: /pofi-admin/src/components/page-dialog/src/page-dialog.vue
-->
<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="50%"
      top="8vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
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
