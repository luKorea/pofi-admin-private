/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-01 11:30:11
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/cache.ts
 */
class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }

  setSessionCache(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  getSessionCache(key: string) {
    // obj => string => obj
    const value = window.sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteSessionCache(key: string) {
    window.sessionStorage.removeItem(key)
  }

  clearSessionCache() {
    window.sessionStorage.clear()
  }
}

export default new LocalCache()
