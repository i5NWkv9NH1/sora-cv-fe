import { NuxtLayout, NuxtPage } from '#components'

function App() {
  return (
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  )
}

export default defineComponent({
  setup() {
    return () => <App />
  },
})
