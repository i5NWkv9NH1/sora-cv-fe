import {
	VContainer
} from 'vuetify'

import {
	VIntro
} from '~/components'

export default defineComponent({
	setup() {
		definePageMeta({ layout: 'editor'})

		return () => (
			<>
				<div>
					<VIntro />
				</div>
			</>
		)
	}
})