<template>
  <div class="uploadWrapper">
    <Vuedraggable
      class="vue-draggable"
      :class="{ disabled: disabled }"
      v-model="imgList"
      @start="onDragStart"
      @end="onDragEnd"
      :item-key="getItemKey"
    >
      <!-- 拖拽元素 -->
      <template #item="{ element, index }">
        <div
          class="draggable-item"
          :style="{ width: showWidth + 'px', height: showHeight + 'px' }"
        >
          <el-image
            v-if="element.type === 'image'"
            :src="element.url"
            fit="cover"
            :preview-src-list="[element.url]"
          ></el-image>
          <video
            v-else-if="element.type === 'video'"
            controls
            style="width: 200px; height: 200px"
            :src="element.url"
          ></video>
          <div class="shadow" @click="onRemoveHandler(index)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>

      <!-- 禁用层遮罩 -->
      <template #header v-if="disabled">
        <div class="disabledShadow"></div>
      </template>

      <!-- 上传按钮 -->
      <template #footer>
        <el-upload
          ref="uploadRef"
          class="uploadBox"
          v-show="!limit || imgList.length < limit"
          :style="{ width: showWidth + 'px', height: showHeight + 'px' }"
          :show-file-list="false"
          :multiple="!isSingle"
          :limit="999"
          :disabled="disabled"
          :http-request="httpRequest"
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          v-bind="otherOptions"
        >
          <i class="el-icon-plus uploadIcon">
            <span class="uploading" v-show="isUploading">正在上传...</span>
            <span
              class="limitTxt"
              v-if="isShowLimit && !isUploading && limit && !isSingle"
            >
              最多{{ limit }}张
            </span>
          </i>
        </el-upload>
      </template>
    </Vuedraggable>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  toRefs,
  onMounted,
  defineProps,
  defineEmits
} from 'vue'
import Vuedraggable from 'vuedraggable'
import { useOSSConfig } from '@/hooks/use-oss-config'
import OSS from 'ali-oss'
import { OSSURL } from '@/service/request/config'
import {
  fileTypeIsImage,
  formatStorage,
  createUniqueString
} from '@/utils/index'
import { errorTip, infoTipBox, warnTip } from '@/utils/tip-info'

const props = defineProps({
  fileTypeName: {
    type: String,
    default: 'help/'
  },
  value: {
    type: Array,
    default: () => []
  },
  otherOptions: {
    type: Object,
    default: () => ({})
  },
  // 限制上传图片的最大数量
  limit: {
    type: Number,
    default: 0
  },
  // 限制数量文字是否展示
  isShowLimit: {
    type: Boolean,
    default: true
  },
  // 限制单张图片的文件存储大小最大值(kb)
  maxSize: {
    type: Number,
    default: 0
  },
  // 图片显示的宽度(px)
  showWidth: {
    type: Number,
    default: 126
  },
  // 图片显示的高度(px)
  showHeight: {
    type: Number,
    default: 126
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 限定图片分辨率宽度值(px)
  screenWidth: {
    type: Number,
    default: 0
  },
  // 限定图片分辨率高度值(px)
  screenHeight: {
    type: Number,
    default: 0
  },
  // 限制图片分辨率宽度最大值(px)
  maxScreenWidth: {
    type: Number,
    default: 0
  },
  // 限制图片分辨率高度最大值(px)
  maxScreenHeight: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits({
  'update:value': null
})

let client = ref<any>()
const isUploading = ref(false) // 正在上传状态
const isFirstMount = ref(true) // 控制防止重复回显

const uploadRef = ref<any>(null)

// 图片数组数据
const imgList = computed({
  get(): any {
    // 此处代码目的为判断文件类型，显示不同组件
    if (props.value && props.value.length > 0) {
      props.value.forEach((item: any) => {
        let name = item.name
        if (item.name.indexOf('?')) {
          name = item.name.split('?')[0]
        }
        item['type'] = fileTypeIsImage(name)
      })
    }
    return props.value
  },
  set(val: any) {
    emit('update:value', val)
  }
})
// 是否是单图上传
const isSingle = computed(() => {
  return +props.limit === 1
})

// watch监听
const { value } = toRefs(props)
watch(
  value,
  () => {
    if (!isFirstMount.value) {
      return
    }
    // 异步数据的回显
    if (props.value.length > 0) {
      syncElUpload()
    }
  },
  { deep: true }
)

// mounted事件
onMounted(() => {
  // 同步数据的回显
  if (props.value.length > 0) {
    syncElUpload()
  }
})

// 同步el-upload数据
function syncElUpload(val?: any) {
  const list: any = val || imgList.value
  if (uploadRef.value) {
    uploadRef.value.uploadFiles = list.map((v: any, i: number) => {
      return {
        name: v.url,
        url: v.url,
        percentage: 100,
        status: 'success',
        uid: createUniqueString()
      }
    })
  }
  isFirstMount.value = false
}

// 上传图片之前
function beforeUpload(file: any) {
  isFirstMount.value = false
  isUploading.value = true
  return new Promise((resolve, reject) => {
    useOSSConfig()
      .then((res) => {
        client.value = new OSS({
          region: 'oss-cn-hongkong',
          stsToken: res.securityToken,
          bucket: res.bucketName,
          ...res
        })
        resolve(client.value)
      })
      .catch((err) => reject(err))
  })
}
const httpRequest = (options: any) => {
  async function uploadImage() {
    if (client.value !== null) {
      isFirstMount.value = false
      const file = options.file
      const suffix = '.' + file.type.split('/')[1]
      const name = props.fileTypeName + client.value.options.fileName + suffix
      client.value.multipartUpload(name, file).then((res: any) => {
        const url = `${OSSURL}/${res.name}`
        imgList.value.push({
          name: res.name + '?' + new Date().getTime(),
          url: url + '?' + new Date().getTime()
        })
        isUploading.value = false
      })
    }
  }
  uploadImage()
}

// 上传完单张图片
function onSuccess(res: any, file: any) {
  isUploading.value = false
}

// 上传出错
function onError(err: any, file: any) {
  errorTip(file.name + ' 上传失败')
  isUploading.value = false
  console.log(err)
}

// 移除单张图片
function onRemoveHandler(index: number) {
  infoTipBox({
    title: '提示',
    message: '确定删除该图片?'
  }).then(() => {
    imgList.value.splice(index, 1)
    syncElUpload()
  })
}

// 超限
function onExceed() {
  // uploadRef.value.abort() // 取消剩余接口请求
  syncElUpload()
  warnTip(`图片超限，最多可上传${props.limit}张图片`)
}

function onDragStart(e: any) {
  e.target.classList.add('hideShadow')
}
function onDragEnd(e: any) {
  e.target.classList.remove('hideShadow')
}

function getItemKey() {
  return createUniqueString()
}

// 校验图片占用大小
function validateSize(file: any) {
  console.log(file)
  const size = +props.maxSize
  const isSizeOut = file.size / 1024 > size
  if (isSizeOut) {
    errorTip(`上传图片大小不能超过${formatStorage(size * 1024)}`)
    return false
  } else {
    isUploading.value = true
    return true
  }
}
// 校验上传图片分辨率
function validateImgScreen(file: any) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      const base64Url = e.target.result
      const img = new Image()
      img.onload = () => {
        // console.log(img.width, img.height)
        if (props.screenWidth && +img.width !== +props.screenWidth) {
          reject()
          errorTip(`上传图片宽度限制只能为${props.screenWidth}像素`)
        } else if (props.screenHeight && +img.height !== +props.screenHeight) {
          reject()
          errorTip(`上传图片高度限制只能为${props.screenHeight}像素`)
        } else if (props.maxScreenWidth && +img.width > +props.maxScreenWidth) {
          reject()
          errorTip(`上传图片宽度不能超过${props.maxScreenWidth}像素`)
        } else if (
          props.maxScreenHeight &&
          +img.height > +props.maxScreenHeight
        ) {
          reject()
          errorTip(`上传图片高度不能超过${props.maxScreenHeight}像素`)
        } else {
          isUploading.value = true
          resolve(true)
        }
      }
      img.src = base64Url
    }
    fileReader.readAsDataURL(file)
  })
}
</script>

<style lang="less" scoped>
.vue-draggable {
  display: flex;
  flex-wrap: wrap;

  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
      border-bottom-left-radius: 6px;
    }
    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }
  &.hideShadow {
    .shadow {
      display: none;
    }
  }

  &.disabled {
    position: relative;

    .disabledShadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-color: rgba(255, 255, 255, 0.4);

      &:hover {
        cursor: not-allowed;
      }
    }
  }
}

:deep(.el-upload) {
  width: 100%;
  height: 100%;
}

// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;

  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 12px;
    text-align: center;
    color: #aaa;
  }
}
</style>
