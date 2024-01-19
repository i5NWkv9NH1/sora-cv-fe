import { VBtn, VCard, VContainer, VDialog } from 'vuetify/components'


//! 获取Props需要定义在内部，无法使用 <T> 去获取
//! 如 defineComponent<T>
export const Child = defineComponent({
  props: {
    modelValue: {
      require: true,
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    console.log('default props', props)
    const dialog = ref(props.modelValue)

    watch(props, (value) => {
      console.log('父组件更新传进来的props', value)
      console.log('更新子组件的状态')
      //! 当父组件更改props时，更新内部的值
      dialog.value = props.modelValue
    })

    watch(dialog, (value) => {
      console.log('内部组件自我更新props', value)
      console.log('通过 emit 传递给父组件')
      emit('update:modelValue', value)
    })



    return () => (
      <VDialog
        v-model={dialog.value}
      >
        <VContainer class={'fill-height'}>
          <VCard class={'fill-height fill-width'}>
            <VBtn
              block
              //@ts-ignore
              onClick={() => { dialog.value = false }}>
              关闭
            </VBtn>
          </VCard>
        </VContainer>
      </VDialog>
    )
  }
})


export const Parent = defineComponent({
  setup() {
    const dialog = ref(false)
    return () => (
      <>
        <Child
          v-model={dialog.value}
        />
        <VBtn
          //@ts-ignore
          onClick={() => { dialog.value = true }}
        >
          打开
        </VBtn>
      </>
    )
  }
})

//! 纯函数无法更新!!!
// export const Parent = () => {
//   const dialog = ref(false)
//   return (
//     <>
//       <Child
//         v-model={dialog.value}
//       />
//       <VBtn
//         //@ts-ignore
//         onClick={() => { dialog.value = true }}
//       >
//         打开 Dialog
//       </VBtn>
//     </>
//   )
// }
