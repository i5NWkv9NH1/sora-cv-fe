export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()
  if (!store.state.token)
    return navigateTo('/signin')
})
