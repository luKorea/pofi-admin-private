<!--
 * @Author: your name
 * @Date: 2022-04-12 14:00:23
 * @LastEditTime: 2022-04-12 14:15:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin-private/src/views/main/resource/center/components/step.vue
-->

<template>
  <el-steps class="hg-mt-3" :active="active" align-center>
    <el-step
      v-for="item in list"
      :key="item.id"
      :title="item.step"
      :description="item.content"
    ></el-step>
  </el-steps>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const list = ref<any>([
      {
        id: 1,
        step: '步骤一',
        content: '填写类型属性',
        color: '#ABDCFF'
      },
      {
        id: 2,
        step: '步骤二',
        content: '填写资源资料（多语言）',
        color: '#FEB692'
      },
      { id: 3, step: '步骤三', content: '上传U3D文件', color: '#90F7EC' },
      { id: 4, step: '步骤四', content: '填写相关关联', color: '#FFD26F' },
      { id: 5, step: '步骤五', content: '修改时间状态', color: '#0bbd87' }
    ])
    return {
      list
    }
  }
})
</script>

<style scoped></style>
