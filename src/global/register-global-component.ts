/*
 * @Author: korealu
 * @Date: 2022-02-16 09:59:37
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 10:14:31
 * @Description: file content
 * @FilePath: /pofi-admin/src/global/register-global-component.ts
 */
import { App } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

const components: any[] = [PageContent, PageSearch, PageModal]

export function registerGlobalComponents(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
