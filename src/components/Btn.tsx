import { renderSlot } from 'vue';
// import { makeBorderProps } from 'vuetify/composables/border.mjs'
// import { makeComponentProps } from 'vuetify/composables/component.mjs'
// import { makeDensityProps } from 'vuetify/composables/density.mjs'
// import { makeDimensionProps } from 'vuetify/composables/dimensions.mjs'
// import { makeElevationProps } from 'vuetify/composables/elevation.mjs'
// import { makeGroupItemProps } from 'vuetify/composables/group.mjs'
// import { makeLoaderProps } from 'vuetify/composables/loader.mjs'
// import { makeLocationProps } from 'vuetify/composables/location.mjs'
// import { makePositionProps } from 'vuetify/composables/position.mjs'
// import { makeRoundedProps } from 'vuetify/composables/rounded.mjs'
// import { makeRouterProps } from 'vuetify/composables/router.mjs'
// import { makeSizeProps } from 'vuetify/composables/size.mjs'
// import { makeTagProps } from 'vuetify/composables/tag.mjs'
// import { makeThemeProps } from 'vuetify/composables/theme.mjs'
// import { makeVariantProps } from 'vuetify/composables/variant.mjs'
import { VBtn } from 'vuetify/lib/components/index.mjs';


export const VBtnToggleSymbol = Symbol.for('vuetify:v-btn-toggle');
export const IconValue = [String, Function, Object, Array];
export default defineComponent({
  props: {
    onClick: {
      type: Function
    },
  },
  setup(_, { slots }) {
    return () => (
      //@ts-ignore
      <VBtn
        //@ts-ignore
        onClick={_.onClick}
        {..._}
      >
        {renderSlot(slots, 'default')}
      </VBtn>
    )
  }
})
