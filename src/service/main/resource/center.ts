import hyRequest from '@/service'

// 资源属性
export function addProperty(data: any) {
  return hyRequest.post<any>({
    url: `/cms/mold/firstAdd`,
    data: data
  })
}

export function updateProperty(data: any) {
  return hyRequest.post<any>({
    url: `/cms/mold/update`,
    data: data
  })
}

// 更新时间状态
export function updateCenterTimer(data: any) {
  return hyRequest.post<any>({
    url: `/cms/mold/update/state`,
    data: data
  })
}

// 获取模型资源资料详情：/api/cms/mold/getPic
// 更新模型资源资料详情：/api/cms/mold/updatePic
export function resourceFileOperation(data: any, type: string) {
  return hyRequest.post<any>({
    url: type === 'get' ? '/cms/mold/getPic' : '/cms/mold/updatePic',
    data: data
  })
}

// 批量修改资源状态
export function selectResourceTypeOperation(data: any) {
  return hyRequest.post<any>({
    url: '/cms/mold/updateBatch',
    data: data
  })
}
