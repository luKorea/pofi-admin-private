const painterLibrary = () =>
  import(
    '@/views/main/contentCenter/painterWiki/painterLibrary/painterLibrary.vue'
  )
export default {
  path: '/painterWiki/painterLibrary',
  name: 'painterLibrary',
  component: painterLibrary,
  children: []
}
