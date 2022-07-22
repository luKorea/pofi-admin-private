<template>
  <!-- 这里展示用户问题 -->
  <el-descriptions
    direction="vertical"
    :column="3"
    border
    size="small"
    style="margin-bottom: 10px"
  >
    <el-descriptions-item label="问题描述">{{
      userHistory.fb.content
    }}</el-descriptions-item>
    <el-descriptions-item label="问题类型">{{ typeDec }}</el-descriptions-item>
    <el-descriptions-item label="附件">
      <template
        v-if="userHistory.fb.imgList && userHistory.fb.imgList.length > 0"
      >
        <page-image
          v-for="(item, index) in userHistory.fb.imgList"
          :key="index"
          :img-src="item"
          style="margin-right: 10px"
        ></page-image>
      </template>
    </el-descriptions-item>
  </el-descriptions>
  <hy-card :title="'当前用户为：' + userName">
    <template #handler>
      <el-select
        @change="handleChangeTag"
        v-model="selectItem"
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="item in tagList"
          :label="item.title"
          :value="item.value"
          :key="item.value"
        ></el-option>
      </el-select>
    </template>
    <!-- 这里展示聊天信息 -->
    <div class="message-wrap" id="chat-room">
      <template v-for="item in list" :key="item.name">
        <div class="item">
          <page-image
            class="avatar"
            style="border-radius: 50%"
            :img-src="item.img"
          ></page-image>
          <div class="user-info">
            <div class="right">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.replyTime }}</div>
            </div>
            <div class="user-message">
              {{ item.replyContent }}
              <template v-if="item.replyFile">
                <page-image
                  :showWidth="200"
                  :showHeight="200"
                  :img-src="item.replyFile"
                ></page-image>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <template #footer>
      <div class="tim-wrap">
        <div class="tim-message">
          <el-input
            v-model.trim="message"
            placeholder="请输入内容"
            :rows="4"
            type="textarea"
            @keyup.enter="sendData"
          ></el-input>
        </div>
        <div class="tim-send">
          <hy-upload
            :limit="1"
            v-model:value="img"
            filetTypeName="feedback/"
            :showHeight="80"
            :showWidth="80"
          ></hy-upload>
          <el-button
            class="hg-mt-3"
            type="primary"
            size="mini"
            @click="sendData"
            >发送</el-button
          >
        </div>
      </div>
    </template>
  </hy-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, computed } from 'vue'
import HyCard from '@/base-ui/card/index'
import HyUpload from '@/base-ui/upload'
import { errorTip } from '@/utils/tip-info'

export default defineComponent({
  name: 'feedbackUserHistory',
  components: {
    HyCard,
    HyUpload
  },
  props: {
    tagList: {
      type: Array,
      default: () => []
    },
    typeDec: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userHistory: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleSendData', 'changeTag'],
  setup(props, { emit }) {
    const selectItem = ref<any>()
    const message = ref<any>()
    const img = ref<any>([])
    // 用户聊天信息
    const list = computed(() => {
      return props?.userHistory?.replys?.length > 0
        ? props.userHistory.replys.map((item: any) => {
            return {
              ...item,
              replyFile: item.replyImgurl,
              img:
                item.replyType === 2
                  ? props.userHistory.fb.user.head
                  : 'https://f3.pofiart.com/base/1638164937055YQjkm.jpg'
            }
          })
        : []
    })
    // 这里是信息地方
    const sendData = () => {
      if (message.value === '') {
        errorTip('请输入内容')
      } else {
        const data = {
          replyTime: new Date().toLocaleString(),
          replyContent: message.value,
          reply: message.value,
          replyFile: img.value.length > 0 ? img.value[0].url : undefined,
          img: 'https://f3.pofiart.com/base/1638164937055YQjkm.jpg'
        }
        emit('handleSendData', data)
        // list.value.push(data)
        message.value = ''
        img.value = []
      }
    }
    watch(list, async () => {
      let ele = document.getElementById('chat-room') as HTMLElement
      await nextTick()
      ele.scrollTop = ele.scrollHeight
    })
    // 设置tag
    const handleChangeTag = () => {
      emit('changeTag', selectItem.value)
    }
    return {
      selectItem,
      message,
      img,
      list,
      handleChangeTag,
      sendData
    }
  }
})
</script>

<style scoped lang="less">
.message-wrap {
  width: 100%;
  display: flex;
  // border: 1px solid rgb(220, 223, 230);
  border-radius: 4px;
  height: calc(100vh - 420px);
  min-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
  // padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .item {
    display: flex;
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
      margin-top: 10px;
      .right {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .name {
          font-size: 14px;
          color: #262d3d;
          margin-right: 10px;
        }
        .time {
          font-size: 12px;
          color: #a1abc2;
        }
      }
      .user-message {
        margin-top: 10px;
        min-height: 14px;
        padding: 10px 15px;
        border-radius: 2px 6px 6px 6px;
        color: #222;
        line-height: 20px;
        background-color: #f1f2f5;
        box-sizing: border-box;
        font-size: 14px;
        max-width: 400px;
        word-break: break-word;
        text-align: left;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.tim-wrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  .tim-message {
    width: 100%;
    margin-right: 20px;
  }
  .tim-send {
    display: flex;
    flex-direction: column;
  }
}
</style>
