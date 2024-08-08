import queryString from 'query-string'
import pages from '../pages.json'
/**
 * 跳转.
 *
 * @param path
 * @param params
 * @param mode
 */
// eslint-disable-next-line complexity
export const redirectTo = (
  path: string,
  params: Object = {},
  mode: 'tabbar' | 'redirectTo' | 'reLaunch' | 'navigateTo' = 'navigateTo'
) => {
  // eslint-disable-next-line prefer-const
  let { url, query } = queryString.parseUrl(path)

  // 拼接参数
  url +=
    '?' +
    queryString.stringify({
      ...query,
      ...params,
    })
  // 导航页
  const tabBarUrl = pages.tabBar?.list.map(item => `/${item.pagePath}`)

  if (tabBarUrl.includes(path)) {
    mode = 'tabbar'
  }
  switch (mode) {
    // 跳转到tabBar页面
    case 'tabbar':
      uni.switchTab({
        url,
      })

      break

    // 关闭当前页面，跳转
    case 'redirectTo':
      uni.redirectTo({
        url,
      })

      break

    // 关闭所有页面，打开
    case 'reLaunch':
      uni.reLaunch({
        url,
      })

      break

    // 保留当前页面 跳转
    case 'navigateTo':
    default:
      uni.navigateTo({
        url,
      })

      break
  }
}
export const redirectBack = () => {
  const length = getCurrentPages().length
  if (length > 1) {
    uni.navigateBack({
      delta: 1,
    })
  } else {
    redirectTo('/pages/home/index')
  }
}
/**
 * 联系客服
 */
export const openCustomerServiceChat = async () => {

  const path = `${process.env.CHAT}/#?role=1688899480538`
  uni.navigateTo({ url: `/pages/minor/web-view/index?path=${encodeURIComponent(path)}` })
}
/**
 * 消息提示
 * @param title
 */
export const showToast = (
  title: string,
  icon?: 'success' | 'error' | 'loading' | 'none' | undefined,
  duration?: number
) => {
  uni.showToast({
    title,
    icon: icon || 'none',
    duration: duration || 3000,
  })
}

export const clearStorage = () => {
  try {
    uni.clearStorageSync()
  } catch (e) {
    // Do something when catch error
  }
}
export const getUserProfile = (cb?: () => void) => {
  uni.getUserProfile({
    desc: '用于完善欠条信息,提供有利保障', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: async (res) => {
      // console.log('getUserProfile===', res, res.userInfo.avatarUrl)
      const { userInfo } = res
      if (userInfo) {
        // await updateUserInfo(userInfo)
      }
      cb && cb()
    },
  })
}
/**
 * 上传接口地址
 */
export const uploadUrl = 'https://qt.59pa.com/prod-api/uav/upload'
/**
 * 上传文件
 * @param title
 */
export const uploadFile = (props: {
  path: string
  formData?: any
  callback?: (path: string) => void
}) => {
  uni.uploadFile({
    url: uploadUrl,
    filePath: props.path,
    name: 'file',
    formData: props.formData,
    success: (res) => {
      console.log('success====', res.data)
      const data = JSON.parse(res.data)
      if (props.callback) {
        props.callback(data.data)
      }
    },
    fail: (res) => {
      console.log('fail====', res)

      return false
    },
  })
}

/**
 * 关键信息隐藏
 * @param str 字符串
 * @param frontLen 字符串前面保留位数
 * @param endLen 字符串后面保留位数
 * @returns {string}
 */
export const hideCode = (str: string, frontLen: number, endLen: number) => {
  str = str || ''
  const len = str.length - frontLen - endLen
  let xing = ''
  for (let i = 0; i < len; i++) {
    xing += '*'
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
}

