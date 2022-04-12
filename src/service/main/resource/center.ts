import hyRequest from '@/service'

// 更新时间状态
export function updateCenterTimer(data: any) {
  return hyRequest.post<any>({
    url: `/cms/mold/update/state`,
    data: data
  })
}
