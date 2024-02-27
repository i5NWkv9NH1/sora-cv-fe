<script setup lang="ts">
const { resume, previewSize, color } = storeToRefs(useResumeStore())
</script>

<template>
  <div
    id="jl-view-container"
    class="min-h-[1169px] mobile-width"
    :style="{ width: '428px' }"
  >
    <div
      data-v-d3e9282b=""
      class="h-full bg-white p-0.5 min-h-[1169px]"
    >
      <div class="w-full flex bg-gray-100">
        <div class="relative">
          <div class="relative overflow-hidden w-7 h-7">
            <img
              :src="resume.form.basicInfo.avatarUrl"
              class="block h-full absolute top-0 left-1/2 transform -translate-x-1/2"
              alt=""
            >
          </div>
        </div>
        <div class="flex flex-col items-start text-left justify-center mx-0.5 mt-0.5">
          <div class="flex">
            <div
              class="text-md font-black"
              :style="{ color }"
              fr-fix-cb074cf9="bold"
            >
              {{ resume.form.basicInfo.name }}
            </div>
            <div
              class="text-md font-light ml-0.5"
              :style="{ color }"
            >
              {{ resume.form.basicInfo.enName }}
            </div>
          </div>
          <div class="text-gray-900 font-normal mt-[0.05rem]">
            {{ resume.form.basicInfo.currentJob }}
          </div>
          <div class="my-0.5 font-light leading-[0.2rem]">
            {{ resume.form.basicInfo.description }}
          </div>
        </div>
      </div>
      <div class="flex w-full flex-wrap">
        <div class="w-full">
          <div w-full="">
            <div class="relative w-fit mt-1">
              <div
                class="text-s font-black"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                基本信息
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
              />
            </div>
            <div class="grid text-left text-xs grid-cols-2">
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >电话：</span> {{ resume.form.basicInfo.phone }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >邮箱：</span> {{ resume.form.basicInfo.email }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >微信号：</span> {{ resume.form.basicInfo.wechat }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >Linkedin：</span> {{ resume.form.basicInfo.linkein }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >当前状态：</span> {{ resume.form.basicInfo.duty }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >现居城市：</span> {{ resume.form.basicInfo.currentCity }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >意向城市：</span> {{ resume.form.basicInfo.purposeCity }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >民族：</span> {{ resume.form.basicInfo.nation }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >婚姻状况：</span> {{ resume.form.basicInfo.marital }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >出生年月：</span> {{ resume.form.basicInfo.birthday }}
              </div><!---->
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >身高：</span> {{ resume.form.basicInfo.height }} cm
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >体重：</span> {{ resume.form.basicInfo.wechat }} kg
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >期望薪资：</span> {{ resume.form.basicInfo.purposeMinSalary }}- {{ resume.form.basicInfo.purposeMaxSalary }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >健康状况：</span> {{ resume.form.others.health.value }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >语言水平：</span> {{ resume.form.others.language.items.toString() }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >兴趣爱好：</span> {{ resume.form.others.hobby.value }}
              </div>
              <div class="mt-0.5">
                <span
                  class="font-bold"
                  fr-fix-cb074cf9="bold"
                >作品集：</span> {{ resume.form.others.portfolio.value }}
              </div><!----><!---->
            </div>
          </div>
          <div class="">
            <div
              class="relative w-fit font-bold mt-1 mb-0.5"
              fr-fix-cb074cf9="bold"
            >
              <div
                class="text-s"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                专业技能
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
                fr-fix-cb074cf9="bold"
              />
            </div>
            <div
              class="text-left p-0.5 mt-0.5 leading-[0.20rem]"
              style="background: rgba(208, 74, 34, 0.08);"
            >
              <div
                class="font-bold"
                fr-fix-cb074cf9="bold"
              >
                软件技能
              </div>
              <div>是13211</div>
            </div>
          </div>
          <div class="">
            <div
              class="relative w-fit font-bold mt-1"
              fr-fix-cb074cf9="bold"
            >
              <div
                class="text-s"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                软件技能
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
                fr-fix-cb074cf9="bold"
              />
            </div>
            <div class="text-left">
              <div class="flex items-center mt-0.5">
                <div class="mr-0.5 whitespace-nowrap">
                  Adobe Photoshop
                </div>
                <div class="flex-1 h-[0.1rem] md:h-[0.05rem] bg-zinc-400" />
              </div>
              <div class="flex items-center mt-0.5">
                <div class="mr-0.5 whitespace-nowrap">
                  Adobe illustrator
                </div>
                <div class="flex-1 h-[0.1rem] md:h-[0.05rem] bg-zinc-400" />
              </div>
              <div class="flex items-center mt-0.5">
                <div class="mr-0.5 whitespace-nowrap">
                  Cinema 4D
                </div>
                <div class="flex-1 h-[0.1rem] md:h-[0.05rem] bg-zinc-400" />
              </div>
              <div class="flex items-center mt-0.5">
                <div class="mr-0.5 whitespace-nowrap">
                  figma
                </div>
                <div class="flex-1 h-[0.1rem] md:h-[0.05rem] bg-zinc-400" />
              </div>
              <div class="flex items-center mt-0.5">
                <div class="mr-0.5 whitespace-nowrap">
                  procreate
                </div>
                <div class="flex-1 h-[0.1rem] md:h-[0.05rem] bg-zinc-400" />
              </div>
            </div>
          </div>
          <div class="">
            <div
              class="relative w-fit font-bold mt-1"
              fr-fix-cb074cf9="bold"
            >
              <div
                class="text-s"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                证书/获奖
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
                fr-fix-cb074cf9="bold"
              />
            </div>
            <div class="text-left flex flex-wrap">
              <div class="flex text-xs mr-0.5 mt-0.5">
                ACAA认证平面设计师
              </div>
              <div class="flex text-xs mr-0.5 mt-0.5">
                2021年GDC设计铜奖
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="">
            <div
              class="relative w-fit font-bold mt-1"
              fr-fix-cb074cf9="bold"
            >
              <div
                class="text-s"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                实习经历
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
                fr-fix-cb074cf9="bold"
              />
            </div>
            <div class="">
              <div>
                <div class="">
                  <div class="flex mt-0.5">
                    <div
                      class="text-left grow text-sm font-black"
                      fr-fix-cb074cf9="bold"
                    >
                      2022/06 - 2022/09
                    </div>
                    <div class="text-right text-sm ml-0.5">
                      厦门
                    </div>
                  </div>
                  <div class="text-left grow mt-[0.05rem] mr-0.5">
                    <div>
                      <div
                        class="text-left font-black text-sm leading-[0.25rem]"
                        fr-fix-cb074cf9="bold"
                      >
                        厦门奈思科技有限公司 - ui设计实习生 (视觉设计部)
                      </div>
                      <div class="text-xs mt-[0.05rem] whitespace-pre-wrap text-gray-600 leading-[0.20rem]">
                        公司主营业务为线上电商，产品主要有陶瓷茶具与关联产品。本人负责线上产品视觉展示，首页和详情设计和修改。线下物料延展，部分节气海报绘制。
                      </div>
                    </div>
                  </div>
                  <div class="text-right hidden">
                    <div
                      class="text-sm font-black whitespace-nowrap leading-[0.25rem] grow"
                      fr-fix-cb074cf9="bold"
                    >
                      2022/06 - 2022/09
                    </div>
                    <div class="text-xs ml-0.5">
                      厦门
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="">
                  <div class="flex mt-0.5">
                    <div
                      class="text-left grow text-sm font-black"
                      fr-fix-cb074cf9="bold"
                    >
                      2021/07 - 2021/10
                    </div>
                    <div class="text-right text-sm ml-0.5">
                      厦门
                    </div>
                  </div>
                  <div class="text-left grow mt-[0.05rem] mr-0.5">
                    <div>
                      <div
                        class="text-left font-black text-sm leading-[0.25rem]"
                        fr-fix-cb074cf9="bold"
                      >
                        厦门阿洛斯信息科技有限公司 - ui设计实习生 (创意设计部)
                      </div>
                      <div class="text-xs mt-[0.05rem] whitespace-pre-wrap text-gray-600 leading-[0.20rem]">
                        公司主营业务为在线交友app，实习期间负责10次以上活动的H5页面的交互稿及视觉设计，通过2个月的实习，对互联网视觉设计流程规范，以及设计风格有了更深的理解。
                      </div>
                    </div>
                  </div>
                  <div class="text-right hidden">
                    <div
                      class="text-sm font-black whitespace-nowrap leading-[0.25rem] grow"
                      fr-fix-cb074cf9="bold"
                    >
                      2021/07 - 2021/10
                    </div>
                    <div class="text-xs ml-0.5">
                      厦门
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div
              class="relative w-fit font-bold mt-1"
              fr-fix-cb074cf9="bold"
            >
              <div
                class="text-s"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                教育经历
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
                fr-fix-cb074cf9="bold"
              />
            </div>
            <div>
              <div class="">
                <div class="flex mt-0.5">
                  <div
                    class="text-left grow text-sm font-black"
                    fr-fix-cb074cf9="bold"
                  >
                    2019/09 - 2023/06
                  </div>
                  <div class="text-right text-sm">
                    全日制 本科
                  </div>
                  <div class="text-right text-sm ml-0.5">
                    厦门
                  </div>
                </div>
                <div class="text-left grow mt-[0.05rem] mr-0.5">
                  <div>
                    <div
                      class="text-left font-black text-sm leading-[0.25rem]"
                      fr-fix-cb074cf9="bold"
                    >
                      厦门理工学院 - 视觉传达设计专业 (设计艺术学院)
                    </div>
                    <div class="text-xs mt-[0.05rem] whitespace-pre-wrap text-gray-600 leading-[0.20rem]">
                      荣誉奖项：优秀毕业生（专业前3%）、一等奖学金（2022，2023）。 主修课程：视觉传达设计方法、视觉传达设计创意、视觉传达设计应用、视觉传达设计传播。
                    </div>
                  </div>
                </div>
                <div class="text-right mt-[0.05rem] hidden">
                  <div
                    class="text-sm font-black whitespace-nowrap leading-[0.25rem]"
                    fr-fix-cb074cf9="bold"
                  >
                    2019/09 - 2023/06
                  </div>
                  <div class="text-xs mt-0.5 whitespace-nowrap">
                    全日制 本科
                  </div>
                  <div class="text-xs mt-0.5">
                    厦门
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div
              class="relative w-fit font-bold mt-1"
              fr-fix-cb074cf9="bold"
            >
              <div
                class="text-s"
                :style="{ color }"
                fr-fix-cb074cf9="bold"
              >
                校内实践
              </div>
              <div
                class="h-[0.04rem] mt-[0.08rem]"
                style="background: rgba(208, 74, 34, 0.5);"
                fr-fix-cb074cf9="bold"
              />
            </div>
            <div class="">
              <div>
                <div class="">
                  <div class="flex mt-0.5">
                    <div
                      class="text-left grow text-sm font-black"
                      fr-fix-cb074cf9="bold"
                    >
                      2020/03 - 2022/06
                    </div>
                    <div class="text-right text-sm ml-0.5">
                      厦门
                    </div>
                  </div>
                  <div class="text-left grow mt-[0.05rem] mr-0.5">
                    <div>
                      <div
                        class="text-left font-black text-sm leading-[0.25rem]"
                        fr-fix-cb074cf9="bold"
                      >
                        活动宣传海报设计 - 宣传部干事 (学院学生会)
                      </div>
                      <div class="text-xs mt-[0.05rem] whitespace-pre-wrap text-gray-600 leading-[0.20rem]">
                        在学生会期间参与各项工作，制作海报，为各项活动拍照宣传，担任活动主持人。负责宣传部各项日常工作，写公众号推文。
                      </div>
                    </div>
                  </div>
                  <div class="text-right hidden">
                    <div
                      class="text-sm font-black whitespace-nowrap leading-[0.25rem] grow"
                      fr-fix-cb074cf9="bold"
                    >
                      2020/03 - 2022/06
                    </div>
                    <div class="text-xs ml-0.5">
                      厦门
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mt-1 {
  margin-top: .25rem;
}
</style>
