// 解析 path
export function parseUrl(fullPath: string) {
  const [path, queryStr] = fullPath.split('?')
  const name = path.slice(path.lastIndexOf('/') + 1)
  const query = {} as any
  queryStr
    ?.split('&')
    .map(i => i.split('='))
    .forEach(i => (query[i[0]] = i[1]))
  return {
    name,
    path,
    query,
  }
}

export function useInit() {
  onShow(() => {
    // console.log('Page Show')
  })
  onHide(() => {
    // console.log('Page Hide')
  })
  // const pages = getCurrentPages()
  // const page = pages[pages.length - 1] as any
  // const { fullPath } = page.$page
  // const {
  //   name: pageName,
  //   path: pagePath,
  //   query: pageQuery,
  // } = parseUrl(fullPath)
  const getLocationParams = (name: string) => {
    // 获取页面栈
    const pages = getCurrentPages()
    // 获取路由参数
    const curPage = pages[pages.length - 1] as any
    return name ? curPage.options[name] : curPage.options
  }

  return {
    getLocationParams,
  }
}
