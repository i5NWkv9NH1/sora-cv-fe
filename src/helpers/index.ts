import type { Article, Template } from '~/mocks'

export async function delay(ms: number) {
  return new Promise((res, rej) => setTimeout(res, ms))
}
export function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16)
}
export function transformField(item: any): Template {
  const _json = JSON.parse(item.fanwenData)
  return {
    ...item,
    id: item.goods_id,
    title: item.goods_name || item.file_name,
    subtitle: item.title,
    description: item.selling_point,
    thumbnailUrl: item.goods_image,
    publishedAt: item.publish_time,
    createdAt: item.publish_time,
    publishedAtForamt: item.publish_time_format,
    sort: item.goods_sort,
    style: item.style,
    status: item.goods_status.value,
    download: {
      url: '',
      password: item.download_password,
    },
    file: {
      name: item.file_name,
      quantity: item.file_quantity,
    },
    model: {
      content: item.fanwen,
      description: item.fanwen_desc,
      data: _json,
    },
    stats: {
      view: item.goods_view,
      like: item.goods_sales,
    },
    thumbnails: Array.isArray(item.image)
      ? item.image.map((_item: any) => {
        return {
          id: _item.image_id,
          src: _item.file_path,
        }
      })
      : [],
    styleCategory: item.style_category.map((_tag: any) => {
      return {
        id: _tag.category_id,
        name: _tag.name,
        value: _tag.url_name,
        seo: {
          title: _tag.seo_title,
          keyword: _tag.seo_keywords,
          description: _tag.seo_desc,
          sort: _tag.sort,
          createdAt: _tag.create_time,
          updatedAt: _tag.update_time,
          wechat: {
            appId: _tag.wxapp_id,
          },
          image: _tag.image,
        },
      }
    }),
    experienceCategory: item.profession_category.map((_tag: any) => {
      return {
        id: _tag.category_id,
        name: _tag.name,
        value: _tag.url_name,
        seo: {
          title: _tag.seo_title,
          keyword: _tag.seo_keywords,
          description: _tag.seo_desc,
          sort: _tag.sort,
          createdAt: _tag.create_time,
          updatedAt: _tag.update_time,
          wechat: {
            appId: _tag.wxapp_id,
          },
          image: _tag.image,
        },
      }
    }),
    jobCategory: item.job_category.map((_tag: any) => {
      return {
        id: _tag.category_id,
        name: _tag.name,
        value: _tag.url_name,
        seo: {
          title: _tag.seo_title,
          keyword: _tag.seo_keywords,
          description: _tag.seo_desc,
          sort: _tag.sort,
          createdAt: _tag.create_time,
          updatedAt: _tag.update_time,
          wechat: {
            appId: _tag.wxapp_id,
          },
          image: _tag.image,
        },
      }
    }),
    tags: item.style_category.map((_tag: any) => {
      return {
        id: _tag.category_id,
        name: _tag.name,
        path: _tag.url_name,
        seo: {
          title: _tag.seo_title,
          keyword: _tag.seo_keywords,
          description: _tag.seo_desc,
          sort: _tag.sort,
          createdAt: _tag.create_time,
          updatedAt: _tag.update_time,
          wechat: {
            appId: _tag.wxapp_id,
          },
          image: _tag.image,
        },
      }
    }),
    isVip: false,
  }
}
export function transformFields(items: any[]): Template[] {
  return items
    .filter(item => item.goods_id !== 10022)
    .map(item => transformField(item))
}

export function transformArticle(item: any): Article {
  return {
    id: item.article_id,
    title: item.article_title,
    content: item.article_content,
    sort: item.article_sort,
    status: item.article_status,
    description: item.seo_desc,
    thumbnailUrl: item.image.file_path,
    seo: {
      description: item.seo_desc,
    },
    stats: {
      view: item.actual_views,
      like: item.dian_zan,
    },
    publishedAt: item.view_time,
    categories: null,
  }
}
