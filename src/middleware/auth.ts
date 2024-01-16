export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()
  console.log(useUserStore().state.token)
  if (!store.state.token) {
    return navigateTo('/signin')
  }
})
