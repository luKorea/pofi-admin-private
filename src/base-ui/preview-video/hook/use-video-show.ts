/*
 * @Author: your name
 * @Date: 2022-03-24 10:06:18
 * @LastEditTime: 2022-03-24 10:06:32
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /pofi-admin/src/base-ui/preview-video/hook/use-video-show.ts
 */
import { ref } from 'vue'
export function useVideoShow() {
  const isShowVideo = ref<boolean>(false)
  const videoUrl = ref<string>('')
  const videoTitle = ref<string>('')

  // 点击按钮播放视频
  const handleShowVideoClick = (src: string, title: string) => {
    isShowVideo.value = !isShowVideo.value
    videoUrl.value = src
    videoTitle.value = title
  }
  return [isShowVideo, videoUrl, videoTitle, handleShowVideoClick]
}
