/*
 * @Author: korealu
 * @Date: 2022-02-08 09:30:30
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-09 10:40:27
 * @Description: file content
 * @FilePath: /pofi-admin/vue.config.js
 */
const path = require('path')

module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  // publicPath: './',
  devServer: {
    proxy: {
      '^/': {
        target: 'http://tcms.pofiart.com',
        changeOrigin: true
      }
    }
  },
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.配置方式三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
