<template>
  <el-upload
    :limit="limit"
    :http-request="httpRequest"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
    :on-preview="onPreview"
    :on-exceed="onExceed"
    :before-upload="onChange"
    :on-progress="onProgress"
    list-type="picture-card"
  >
    <el-icon><plus /></el-icon>
  </el-upload>
  <!-- <el-dialog v-model="dialogVisible">
    <img width="400px" :src="dialogImageUrl" alt="" />
  </el-dialog> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import OSS from 'ali-oss'
import { useOSSConfig, clientSendFile } from '@/hooks/use-oss-config'
import { errorTip, successTip, warnTip } from '@/utils/tip-info'

import { Plus } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    Plus
  },
  props: {
    limit: {
      type: Number,
      default: 5
    },
    fileTypeName: {
      type: String,
      default: 'help/'
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  emits: ['successClick', 'removeClick', 'update:value'],
  setup(props, { emit }) {
    let client: any = null
    useOSSConfig().then((res) => {
      client = new OSS({
        region: 'oss-cn-hongkong',
        stsToken: res.securityToken,
        bucket: res.bucketName,
        ...res
      })
    })
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const onSuccess = () => successTip('上传成功')
    const onRemove = (file: any) => {
      const newValue = props.value.filter(
        (item: any) => item.name !== file.name
      )
      // console.log(newData)
      emit('update:value', newValue)
    }
    // 限制上传个数
    const onExceed = () => {
      errorTip(`最多只能上传${props.limit}个`)
    }
    const onPreview = (file: any) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }
    const onChange = () => {
      debugger
      if (props.value.length === props.limit) {
        debugger
        warnTip('当前上传文件数量已经达到限制啦，请删除后重新上传')
        return
      }
    }
    // 进度条
    const onProgress = () => {
      console.log(2)
    }
    // beforeRemove
    const httpRequest = (options: any) => {
      const file = options.file
      clientSendFile(client, props.fileTypeName, client.options.fileName, file)
        .then((res: any) => {
          console.log(res.res)
          const url = res.res.requestUrls[0].split('?')[0]
          emit('update:value', [
            ...props.value,
            {
              url: url,
              name: res.name
            }
          ])
          // onSuccess()
        })
        .catch((err) => {
          console.log(err, 'err')
        })
    }
    return {
      dialogImageUrl,
      dialogVisible,
      httpRequest,
      onPreview,
      onSuccess,
      onExceed,
      onRemove,
      onChange,
      onProgress
    }
  }
})
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
