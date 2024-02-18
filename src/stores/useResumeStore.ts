import { mockDegrees, mockDutyData, mockEducationalBackgrounds, mockGenderData, mockMaritalData, mockModifyEducationNamePresets, mockModifyWorkNamePresets, mockNationData, mockResumes, mockSchoolings } from '~/mocks'
import { v4 as uuid } from 'uuid'

export const useResumeStore = defineStore('resume', () => {
  const resumes = ref([mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0], mockResumes[0]])

  const resume = ref(mockResumes[0])
  const genders = ref(mockGenderData)
  const nations = ref(mockNationData)
  const maritals = ref(mockMaritalData)
  const dutys = ref(mockDutyData)

  const backgrounds = ref(mockEducationalBackgrounds)
  const schollings = ref(mockSchoolings)
  const degrees = ref(mockDegrees)

  const modules = computed(() => {
    if (resume) {
      return [
        { id: uuid(), name: resume.value.form.basicInfo.moduleName, icon: 'mdi-pencil-outline', value: 1, key: 'FormBasicInfo', component: 'FormBasicInfo' },
        { id: uuid(), name: resume.value.form.education.moduleName, icon: 'mdi-pencil-outline', value: 2, key: 'FormEducationInfo', component: 'FormEducationInfo' },
        { id: uuid(), name: resume.value.form.work.moduleName, icon: 'mdi-pencil-outline', value: 3, key: 'FormWorkInfo', component: 'FormWorkInfo' },
        { id: uuid(), name: resume.value.form.school.moduleName, icon: 'mdi-pencil-outline', value: 4, key: 'FormExperienceInfo', component: 'FormExperienceInfo' },
        { id: uuid(), name: resume.value.form.skill.moduleName, icon: 'mdi-pencil-outline', value: 5, key: 'FormSkillInfo', component: 'FormSkillInfo' },
        { id: uuid(), name: resume.value.form.others.moduleName, icon: 'mdi-pencil-outline', value: 6, key: 'FormOthers', component: 'FormOthers' },
      ]
    }
  })
  const presetEducationNames = ref(mockModifyEducationNamePresets)
  const presetWorkNames = ref(mockModifyWorkNamePresets)

  async function updateResumes(items: any[]) {
    resumes.value = items
  }

  async function findResumeById(id: string) {
    return resumes.value[0]
  }
  async function findResumes() {
    return resumes
  }
  async function updateResumeName(id: string, name: string) {
    resumes.value[0].name = name
  }
  async function deleteResume(id: string) {
    console.log('action::', deleteResume.name, id)
  }

  return {
    resume,
    resumes,

    updateResumes,
    findResumes,
    findResumeById,
    updateResumeName,
    deleteResume,

    presetEducationNames,
    presetWorkNames,
    modules,
    genders,
    nations,
    maritals,
    dutys,
    backgrounds,
    schollings,
    degrees,
  }
}, { persist: true })
