import { VBtn, VCard, VContainer, VDivider, VIcon, VTextField } from 'vuetify/components'
import { ClientOnly } from '#components'

type ComponentList =
  | 'Button'
  | 'Card'
  | 'Container'
  | 'Divider'
  | 'Input'

export interface IComponent {
  type: ComponentList
  data: {
    id: string
    embeddedView?: IComponent
    items?: Array<IComponent>
    [key: string]: unknown
  }
}

export const Components = {
  VBtn,
  VCard,
  VContainer,
  VDivider,
  VTextField,
  VIcon,
}

function createPage(data?: IComponent) {
  if (!data)
    return null

  function createComponent(item: IComponent) {
    const { data, type } = item
    const { items, embeddedView, id, ...rest } = data
    return h(
      Components[type] as any,
      {
        ...rest,
        key: id,
      } as any,
      Array.isArray(items)
        ? items.map(renderer)
        : renderer(embeddedView ?? null),
    )
  }

  function renderer(
    config: IComponent | null,
  ) {
    if (!config)
      return null

    return createComponent(config)
  }

  return renderer(data)
}

function Wrapper() {
  return (
    <ClientOnly>
      {/* @ts-expect-error */}
      {/* {createPage(json)} */}
    </ClientOnly>
  )
}

export default defineComponent({
  setup() {
    definePageMeta({ layout: 'editor' })
    return () => <Wrapper />
  },
})
