import { VBtn, VColorPicker, VIcon, VMenu, VSelect, VSheet } from 'vuetify/components'
import type { ColorMode } from '~/types'

//TODO props
type PickColorMenuProps = {
  color: Ref<string>
  mode: Ref<ColorMode>
}
export function PickColorMenu(props: PickColorMenuProps) {
  const modes = ref<ColorMode[]>(['hsla', 'rgba', 'hexa'])
  const color = ref(props.color)
  const mode = ref(props.mode)

  return (
    <VMenu
      offset={10}
      transition={'slide-y-transition'}
      closeOnContentClick={false}
      v-slots={{
        default: () => (
          <VSheet class={'pa-4'} >
            <VColorPicker
              v-model={color.value}
              mode={mode.value}
              showSwatches
            />
            <VSelect
              class={'mt-4'}
              v-model={mode.value}
              items={modes.value}
              density={'compact'}
              variant={'solo'}
              label={'颜色输出格式'}
              rounded={'lg'}
              eager
              hideDetails
              hideNoData
              hideSpinButtons
            />
          </VSheet>
        ),
        activator: ({ props, isActive }) =>
          <VBtn
            {...props}
            variant={'text'}
          >
            <VIcon start>mdi-palette</VIcon>
            <span>修改主题色</span>
          </VBtn>
      }}
    />
  )
}
