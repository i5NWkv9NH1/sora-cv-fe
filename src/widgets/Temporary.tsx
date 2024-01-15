//@ts-nocheck

import {
  VBtn,
  VCard,
  VCardText,
  VCol,
  VImg,
  VRow,
  VSheet
} from 'vuetify/lib/components/index.mjs'

export function Cover(state) {
  return (
    <VRow align={'center'} justify={'space-between'}>
      <VCol>
        <div class='text-h3'>{state.cover.title}</div>
        <div class='text-h4 font-weight-bold'>{state.cover.subtitle}</div>
        <div class='text-subtitle-1 text-surface-4'>{state.cover.caption}</div>
        <VBtn variant={'text'} to={'/signin'}>
          创建您的简历
        </VBtn>
      </VCol>
      <VCol>
        <VImg src={state.cover.url} cover />
      </VCol>
    </VRow>
  )
}
export function Intros(state) {
  return (
    <VRow>
      {state.intros.map((item) => (
        <VCol cols={12} lg={4} key={item.title}>
          <VCard color={item.color}>
            <VCardText>
              <VImg src={item.thumbnailUrl} />
              <div class={'text-h6 font-weight-bold'}>{item.title}</div>
              <div class={'text-subtitle-1'}>{item.subtitle}</div>
            </VCardText>
          </VCard>
        </VCol>
      ))}
    </VRow>
  )
}
export function Templates(state) {
  return (
    <>
      <div>
        <div class={'text-h4 font-weight-bold'}>热门简历模板</div>
        <VRow>
          {state.templates.map((template) => (
            <VCol cols={12} lg={4} key={template.id}>
              <VCard class={'relative'} width={'100%'}>
                <VCardText>
                  <div class={'d-flex flex-column'}>
                    <div class={'text-h6 font-weight-bold'}>
                      {template.title}
                    </div>
                    <div class={'text-caption'}>{template.description}</div>
                    <VImg src={template.thumbnailUrl} />
                    <div class={'d-flex'}>
                      <VBtn to={'/signin'}>使用模板</VBtn>
                      <VBtn to={'/signin'}>查看模板</VBtn>
                    </div>
                    <div class={'d-flex'}>
                      {template.tags.map((tag) => (
                        <div class={'text-caption'} key={tag.id}>
                          #{tag.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          ))}
        </VRow>
        <div class={'d-flex'}>
          <VBtn to={'/templates'}>查看全部模板</VBtn>
        </div>
      </div>
    </>
  )
}
export function AI(state) {
  return (
    <div>
      <div class={'text-h6 font-weight-bold'}>热门 AI 求职工具</div>
      <VRow>
        {state.ai.map((item) => (
          <VCol cols={12} lg={4} key={item.id}>
            <VCard width={'100%'} to={`/ai/${item.id}`}>
              <VCardText>
                <VImg src={item.thumbnailUrl} />
                <div class={'text-h6 font-weight-bold'}>{item.name}</div>
                <div class={'text-subtitle-1'}>{item.description}</div>
              </VCardText>
            </VCard>
          </VCol>
        ))}
      </VRow>
      <div class={'d-flex'}>
        <VBtn to={'/ai'}>查看所有工具</VBtn>
      </div>
    </div>
  )
}
