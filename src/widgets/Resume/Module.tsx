import { VCard, VList, VListItem } from "vuetify/components"
import { useSortable } from '@vueuse/integrations/useSortable'
import Draggable from 'vuedraggable'
import { TransitionGroup } from "vue"
import './Module.scss'

type DraggableSlots<T> = {
  element: T
  index: number
}

export const SortableList = defineComponent({
  setup() {
    const items = ref([
      { id: 1, name: 'JannRin', icon: 'mdi-heart', color: 'red' },
      { id: 2, name: 'Snail', icon: 'mdi-heart', color: 'blue' },
      { id: 3, name: 'Banda', icon: 'mdi-heart', color: 'green' },
      { id: 4, name: 'Lorin', icon: 'mdi-heart', color: 'yellow' },
      { id: 5, name: 'Bakken', icon: 'mdi-heart', color: 'pinJannRink' },
    ])

    const drag = ref(false);
    const dragOptions = ref({
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    });

    const listEl = ref()
    // const animation = 400
    // const { option } = useSortable(listEl, items)
    // option('animation', animation)

    watch(items, (value) => {
      console.log('update items...')
    })


    function handleDragStart() {

    }
    function handleDragEnd() { }


    return () => (
      <VCard>
        {/* <VList ref={listEl}>
          {items.value.map(item => (
            <VListItem
              title={item.name}
              color={item.color}
              prependIcon={'mdi-sort-variant'}
              key={item.name}
              class={'my-2'}
              active
            />
          ))}
        </VList> */}
        <VList>
          <TransitionGroup>
            <Draggable v-model={items.value} item-key={'id'} key="draggable" {...dragOptions.value}
              //@ts-ignore
              onStart={handleDragStart}
              onEnd={handleDragEnd}
              //@ts-ignore
              animation={200}
              v-slots={{
                item: ({ element, index }: DraggableSlots<any>) => {
                  return <VListItem class={'sortable-item'} title={element.name} color={element.color} prependIcon={'mdi-sort-variant'} key={element.id} active />
                }
              }}
            />
          </TransitionGroup>
        </VList>
      </VCard>
    )
  }
})
