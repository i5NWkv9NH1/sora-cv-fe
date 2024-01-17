import { defineComponent, ref, type StyleValue } from 'vue';
import { VContainer, VSheet, VSkeletonLoader, VTab, VTabs, VWindow, VWindowItem } from 'vuetify/components';
import type { ResumeWindow, IUIState, ResumeTab } from '~/types';
import { BasicInfo, Test } from './Tab';
import { delay } from '~/helpers';
import { resumeTabs } from '~/data';
import './Form.scss'


//* 左栏表格容器
export const ResumeForm = defineComponent({
  setup() {
    //#region state
    //TODO store
    const appBarHeight = ref(64);
    const density = ref<any>('default')

    //* tab
    const current = ref(1);
    const tabs = ref<ResumeTab[]>();
    const windows = ref<ResumeWindow[]>([
      { key: 1, value: 1, component: BasicInfo },
      { key: 2, value: 2, component: Test },
      { key: 3, value: 3, component: Test },
      { key: 4, value: 4, component: Test },
      { key: 5, value: 5, component: Test },
      { key: 6, value: 6, component: Test },
    ]);
    const uiState = ref<IUIState>('ok');
    tabs.value = resumeTabs;

    //#endregion


    //#region api

    //#endregion


    //#region widgets
    function Tabs() {
      function Loading() {
        return (
          <VSkeletonLoader type={'button@6'} />
        );
      }
      function OK() {
        return (
          <VContainer
            //? 对齐 header 的箭头
            class={'pa-2'}
          >
            <VTabs v-model={current.value} density={density.value} showArrows>
              {tabs.value!.map(tab => (
                <VTab
                  class={'mr-4'}
                  value={tab.value}
                  key={tab.value}
                  icon={tab.icon ? tab.icon : false}
                  v-slots={{
                    default: () => <span>{tab.name}</span>
                  }} />
              ))}
            </VTabs>
          </VContainer>
        );
      }
      switch (uiState.value) {
        case 'loading':
          return <Loading />;
        case 'ok':
          return <OK />;
        default:
          return <Loading />;
      }

    }

    function Window() {
      const { height } = storeToRefs(usePreferencesStore())
      function Loading() {
        return <VSkeletonLoader type={'paragraph@6'} />;
      }
      function OK() {
        return (
          <VSheet class={'form'} rounded={false}
            style={{
              overflow: 'scroll',
              minHeight: `calc(100vh - ${height.value * 2}px)`,
              maxHeight: `calc(100vh - ${height.value * 2}px)`
            }}
          >
            <VWindow v-model={current.value}>
              {windows.value.map(item => (
                <VWindowItem value={item.value} key={item.key}>
                  <item.component />
                </VWindowItem>
              ))}
            </VWindow>
          </VSheet>
        );
      }

      switch (uiState.value) {
        case 'loading': return <Loading />;
        case 'ok': return <OK />;
        default: return <Loading />;
      }
    }

    //#endregion
    return () => (
      // <VSheet
      //   //* 添加 class 隐藏滚动条
      //   class={'form fill-height'}
      //   style={stlyes.value}
      // >
      //   <Tabs />
      //   <Window />
      // </VSheet>
      <>
        <Tabs />
        <Window />
      </>
    );
  }
});
export const ResumeFormWrapper2 = ResumeForm