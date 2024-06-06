import { getTaskCate } from '@/api/uav'
import { pinia } from '../../../store'
import { isH5 } from '../../../utils/env'

interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}
interface CateItem {
  id: number,
  name: string,
  icon: string,
  categoryList: Array<{ id: number, name: string, price: number, icon: string, }>
}
interface EnumsState {
  cate: CateItem | any[]
}

export const useAppStore = defineStore(
  'app',
  () => {
    const enums = ref<EnumsState>({
      cate: []
    })
    const setEnums = () => {
      getTaskCate().then(res => {
        enums.value = {
          ...enums.value,
          cate: [res.data]
        }
      })
    }
    // #ifdef H5
    const themeStorage = localStorage.getItem('vitepress-theme-appearance')
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    // #endif
    const darkMode = ref(isH5 ? (themeStorage === 'dark' || theme) : false)

    const statusBarHeight = ref(0)
    const menuButtonBounding = ref<MenuButtonBoundingClientRect>()
    const customBarHeight = computed(
      () => !menuButtonBounding.value
        ? 0
        : menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value,
    )
    // #ifdef H5
    watch(darkMode, (isDark) => {
      isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    }, {
      immediate: true,
    })


    // #endif


    return {
      darkMode,
      statusBarHeight,
      customBarHeight,
      menuButtonBounding,
      enums,
      setEnums
    }
  },
)

export function useAppStoreWidthOut() {
  return useAppStore(pinia)
}
