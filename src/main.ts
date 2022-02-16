/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:31
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-16 10:03:12
 * @Description: file content
 * @FilePath: /pofi-admin/src/main.ts
 */
import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import './index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import { registerGlobalComponents } from './global/register-global-component'

const app = createApp(App)

// 注册element-plus/其他
app.use(globalRegister)
app.use(store)
// 全局注册搜索，表格组件
registerGlobalComponents(app)
setupStore()
// path: /user => user
app.use(router)

app.mount('#app')
