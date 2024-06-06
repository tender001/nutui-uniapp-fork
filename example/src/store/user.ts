// import { defineStore } from 'pinia'
import { getPermissions } from '@/api'
import { postLogin, getUserInfo } from '@/api/uav'
import { setToken } from '@/packages/utils'

interface UserInfoProps {
  realName?: string
  avatarUrl: string
  phone: string
  nickName?: string
  /** 状态 0.待认证 1.认证成功 2.审核中 3.审核失败 */
  state?: number
  userId?: string | number
  remainCount?: number
}

export interface UserState {
  userinfo: UserInfoProps
  permissions: Record<string, any>[]
}

const defaultUser = {
  realName: '',
  avatarUrl: '',
  phone: '',
  userName: '',
  /** 状态 0.待认证 1.认证成功 2.审核中 3.审核失败 */
  state: 0,
  userId: '',
  remainCount: 0
}

export const useUserStore = defineStore('user', () => {
  const userinfo = ref<UserInfoProps>(defaultUser)
  const permissions = ref([])
  const setUserName = async (nickName: string) => {
    userinfo.value = { ...userinfo.value, nickName }
  }
  const setUserinfo = async () => {
    const res: any = await getUserInfo()
    if (!res || res.code !== 0) return
    userinfo.value = res.data
  }
  const setPermissions = async () => {
    const res: any = await getPermissions()
    if (!res || res.code !== 0) return
    permissions.value = res.data
  }
  const cleanup = () => {
    userinfo.value = defaultUser
    permissions.value = []
  }
  const login = async (userInfo: any) => {
    const { code } = await uni.login()
    const params = { ...userInfo, code }
    const res: any = await postLogin(params)
    setToken(res.data)
    await setUserinfo()
    uni.showToast({
      title: `登录成功`,
      icon: 'success',
      duration: 2000,
    })
    return Promise.resolve(res.data)
  }
  return {
    setUserName,
    setUserinfo,
    setPermissions,
    cleanup,
    userinfo,
    permissions: [],
    login
  }
})
