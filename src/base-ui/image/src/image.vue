<!--
 * @Author: your name
 * @Date: 2022-03-17 10:37:58
 * @LastEditTime: 2022-03-17 10:54:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/base-ui/image/src/image.vue
-->
<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="点击查看大图"
    placement="top-start"
  >
    <el-image
      :src="imgSrc"
      style="width: 40px; height: 40px"
      fit="cover"
      :preview-src-list="imgList.length > 0 ? imgList : [imgSrc]"
    >
      <template #error>
        <div class="image-slot" style="font-size: 50px">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'PageImage',
  components: {
    IconPicture
  },
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    imgList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
