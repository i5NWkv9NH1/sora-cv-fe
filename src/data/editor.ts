import type { PreviewOption, ResumeTab, } from "~/types"
//? 性别
export const genderData = [
  { id: 1, label: '男', value: 1, icon: '' },
  { id: 2, label: '女', value: 2, icon: '' },
  { id: 3, label: 'LGBT', value: 3, icon: '' },
  { id: 4, label: '未知生物', value: 4, icon: '' }
]
//? 婚姻
export const maritalData = [
  { label: '未婚', value: 1, icon: '' },
  { label: '已婚', value: 2, icon: '' },
  { label: '延迟结婚', value: 3, icon: '' },
  { label: '灵活结婚', value: 4, icon: '' },
  { label: '丁克', value: 5, icon: '' }
]
//? 是否在岗位
export const dutyData = [
  { label: '离校-随时到岗位', value: 1 }
]
//? 民族
export const nationData = [
  { "code": "01", "nation": "汉族" },
  {
    "code": "02",
    "nation": "蒙古族"
  }, {
    "code": "03",
    "nation": "回族"
  }, {
    "code": "04",
    "nation": "藏族"
  }, {
    "code": "05",
    "nation": "维吾尔族"
  }, {
    "code": "06",
    "nation": "苗族"
  }, {
    "code": "07",
    "nation": "彝族"
  }, {
    "code": "08",
    "nation": "壮族"
  }, {
    "code": "09",
    "nation": "布依族"
  }, {
    "code": "10",
    "nation": "朝鲜族"
  }, {
    "code": "11",
    "nation": "满族"
  }, {
    "code": "12",
    "nation": "侗族"
  }, {
    "code": "13",
    "nation": "瑶族"
  }, {
    "code": "14",
    "nation": "白族"
  }, {
    "code": "15",
    "nation": "土家族"
  }, {
    "code": "16",
    "nation": "哈尼族"
  }, {
    "code": "17",
    "nation": "哈萨克族"
  }, {
    "code": "18",
    "nation": "傣族"
  }, {
    "code": "19",
    "nation": "黎族"
  }, {
    "code": "20",
    "nation": "傈僳族"
  }, {
    "code": "21",
    "nation": "佤族"
  }, {
    "code": "22",
    "nation": "畲族"
  }, {
    "code": "23",
    "nation": "高山族"
  }, {
    "code": "24",
    "nation": "拉祜族"
  }, {
    "code": "25",
    "nation": "水族"
  }, {
    "code": "26",
    "nation": "东乡族"
  }, {
    "code": "27",
    "nation": "纳西族"
  }, {
    "code": "28",
    "nation": "景颇族"
  }, {
    "code": "29",
    "nation": "柯尔克孜族"
  }, {
    "code": "30",
    "nation": "土族"
  }, {
    "code": "31",
    "nation": "达斡尔族"
  }, {
    "code": "32",
    "nation": "仫佬族"
  }, {
    "code": "33",
    "nation": "羌族"
  }, {
    "code": "34",
    "nation": "布朗族"
  }, {
    "code": "35",
    "nation": "撒拉族"
  }, {
    "code": "36",
    "nation": "毛难族"
  }, {
    "code": "37",
    "nation": "仡佬族"
  }, {
    "code": "38",
    "nation": "锡伯族"
  }, {
    "code": "39",
    "nation": "阿昌族"
  }, {
    "code": "40",
    "nation": "普米族"
  }, {
    "code": "41",
    "nation": "塔吉克族"
  }, {
    "code": "42",
    "nation": "怒族"
  }, {
    "code": "43",
    "nation": "乌孜别克族"
  }, {
    "code": "44",
    "nation": "俄罗斯族"
  }, {
    "code": "45",
    "nation": "鄂温克族"
  }, {
    "code": "46",
    "nation": "崩龙族"
  }, {
    "code": "47",
    "nation": "保安族"
  }, {
    "code": "48",
    "nation": "裕固族"
  }, {
    "code": "49",
    "nation": "京族"
  }, {
    "code": "50",
    "nation": "塔塔尔族"
  }, {
    "code": "51",
    "nation": "独龙族"
  }, {
    "code": "52",
    "nation": "鄂伦春族"
  }, {
    "code": "53",
    "nation": "赫哲族"
  }, {
    "code": "54",
    "nation": "门巴族"
  }, {
    "code": "55",
    "nation": "珞巴族"
  }, {
    "code": "56",
    "nation": "基诺族"
  }, {
    "code": "97",
    "nation": "其他"
  }, {
    "code": "98",
    "nation": "外国血统"
  }]
//? 预览选项
export const previewSizeOptionsData: PreviewOption[] = [
  { id: 1, label: 'A4尺寸', value: 'A4', icon: 'mdi-monitor' },
  { id: 2, label: '手机尺寸', value: 'PHONE', icon: 'mdi-cellphone' },
]
export const resumeTabs: ResumeTab[] = [
  {
    id: 1,
    name: '基本信息',
    icon: 'mdi-pencil-outline',
    value: 1,
    key: 'basicInfo'
  },
  {
    id: 2,
    name: '教育经历',
    icon: 'mdi-pencil-outline',
    value: 2,
    key: 'basicInfo'
  },
  {
    id: 3,
    name: '实习经历',
    icon: 'mdi-pencil-outline',
    value: 3,
    key: 'basicInfo'
  },
  {
    id: 4,
    name: '校内实践',
    icon: 'mdi-pencil-outline',
    value: 4,
    key: 'basicInfo'
  },
  {
    id: 5,
    name: '专业技能',
    icon: 'mdi-pencil-outline',
    value: 5,
    key: 'basicInfo'
  },
  {
    id: 6,
    name: '其他',
    icon: 'mdi-pencil-outline',
    value: 6,
    key: 'basicInfo'
  }
]
