/*
 * @Author: korealu
 * @Date: 2022-02-08 09:29:11
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-14 13:59:05
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/index.ts
 */
import type { App } from 'vue'
import registerElement from './register-element'
import registerVxeTable from './register-vxe-table'
import registerProperties from './register-properties'
import registerGlobalComponents from './register-global-component'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
  app.use(registerVxeTable)
  app.use(registerGlobalComponents)
}
