/*
 * @Author: korealu
 * @Date: 2022-02-11 09:37:42
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-11 10:20:06
 * @Description: file content
 * @FilePath: /pofi-admin/tailwind.config.js
 */
module.exports = {
  content: [],
  // 配置 Tailwind 来移除生产环境下没有使用到的样式声明
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  prefix: 'hg-'
}
