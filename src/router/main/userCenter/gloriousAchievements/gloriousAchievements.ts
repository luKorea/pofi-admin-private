const gloriousAchievements = () =>
  import(
    '@/views/main/userCenter/gloriousAchievements/gloriousAchievements.vue'
  )
export default {
  path: '/userCenter/gloriousAchievements',
  name: 'gloriousAchievements',
  component: gloriousAchievements,
  children: []
}
