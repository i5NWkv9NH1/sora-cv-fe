import { v4 as uuid } from 'uuid'
import type { PayType, VIP } from '~/types'

export const vipsData: VIP[] = [
  { id: uuid(), title: '月度会员', price: 18, payTime: '每月', type: 1, description: `<p>无限制访问所有简历模板</p>\n <p>创建和编辑您的简历</p><p>使用ai简历助手</p>`, order: 0, value: 1 },
  { id: uuid(), title: '年度会员', price: 99, payTime: '每年', type: 2, description: `<p>无限制访问所有简历模板</p>\n <p>创建和编辑无限的简历</p><p>使用ai简历助手</p>`, order: 1, value: 2 },
  { id: uuid(), title: '终身会员', price: 198, payTime: '终身', type: 3, description: `<p>无限制访问所有简历模板</p>\n <p>创建和编辑您的简历</p><p>AI简历助手无限制使用</p>`, order: 0, value: 3 },
]
export const faqsData = [
  { id: uuid(), title: '奈思简历（NiceCV.cn）是什么？', content: `<p>奈思简历NiceCV 是一个在线简历制作平台，提供超多制作精心制作可修改定制的简历模板，借助奈思简历NiceCV，您可以自信、专业地展示自己，给潜在雇主留下难忘的印象。NiceCV旨在帮助像您这样的求职者发挥潜力并获得梦想的职位，同时节省简历制作的时间。</p> <br /> <p>奈思简历NiceCV 的主要功能有：创建、编辑和下载简历；原创设计的专业简历模板；简历制作的ai助手。</p>` },
  { id: uuid(), title: '我可以使用哪些免费功能？', content: `<p>奈思简历NiceCV提供免费的在线简历模板，可免费编辑保存，如果需要下载保存为PDF文件则需购买VIP会员。另外奈思简历NiceCV还提供免费的ai求职工具，帮你节约写简历的时间。</p>` },
  { id: uuid(), title: '哪些功能需要开通VIP会员才能使用？', content: `<p>奈思简历NiceCV 提供丰富的简历模板，这些模板都是原创设计，您仅需购买月会员就可以使用。开通会员后，您可以使用所有的简历模板，制作好的简历可保存为PDF，您也可以分享简历的在线版本。简历提供A4尺寸、手机尺寸两个规格，你可以根据实际情况选择使用。</p>` },
  { id: uuid(), title: '开通VIP会员后会自动续费吗？', content: `<p>不会，你可以选择月会员、年会员和终身会员，月会员时间为30天，年会员时间为365天，终身会员为永久有效，会员到期后VIP功能自动停止使用。</p>` },
  { id: uuid(), title: '有哪些付款方式？', content: `<p>您可以使用多种支付方式，包括 微信 和 支付宝。</p>` },
  { id: uuid(), title: '是否支持退款？', content: `<p>当前不支持退款服务，如确有退款需求的，请添加我们的官方微信客服（Nicecv_cn）或给我们发邮件（hi@nicecv.cn），说明理由以及写明你的用户ID（可以点击顶部导航用户头像进入个人中心，然后点击个人设置查看用户ID）。</p>` },
]

export const payTypesData: PayType[] = [
  { id: uuid(), color: 'green', name: '微信', value: 1, icon: 'https://pic.616pic.com/ys_b_img/00/10/32/mZKDjCpdSC.jpg' },
  { id: uuid(), color: 'blue', name: '支付宝', value: 2, icon: 'https://pic.616pic.com/ys_b_img/00/08/17/2xDu2Knwvc.jpg' },
]
