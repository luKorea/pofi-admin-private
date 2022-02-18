<!--
 * @Author: korealu
 * @Date: 2022-02-18 10:14:26
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-18 14:12:52
 * @Description: file content
 * @FilePath: /pofi-admin/src/base-ui/upload/src/ossUpload.vue
-->
<template>
  <div class="upload-container">
    <el-upload
      ref="uploadRef"
      name="file"
      :limit="limit"
      :accept="accept"
      :multiple="true"
      :file-list="defaultFileList"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      class="editor-slide-upload"
      action="#"
    >
      <el-button size="small" type="primary"> 点击上传 </el-button>
      <template #tip>
        <div class="el-upload__tip">{{ tips }}</div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OSS from 'ali-oss'
import { useOSSConfig, clientSendFile } from '@/hooks/use-oss-config'
export default defineComponent({
  name: 'Upload',
  props: {
    tips: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    fileTypeName: {
      type: String,
      default: 'help/'
    }
  },
  emits: ['success-callback', 'remove-callback', 'change-callback'],
  setup() {
    let client: any = null
    useOSSConfig().then((res: any) => {
      client = new OSS({
        ...res,
        bucket: res.bucketName
      })
      console.log(client)
    })
    return {}
  }
})
</script>
