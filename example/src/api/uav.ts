import { requests } from './base'
import type { AuthRow, TaskItem } from './type'

// 飞手认证
export const postAuth = (data: AuthRow): Promise<any> => {
    return requests.post('/api/uav/auth', data)
}
// 绑定用户手机号
export const postBindLocalPhoneNumber = (data: { phone: string }): Promise<any> => {
    return requests.post('/api/uav/bindLocalPhoneNumber', data)
}
// 绑定手机号
export const postBindPhoneNumber = (data: { code: string, encryptedData: string, iv: string }): Promise<any> => {
    return requests.post('/api/uav/bindPhoneNumber', data)
}
// 支付下单
export const postCreateOrder = (data: { buyCount: number, buyPrice: number, id?: string, type?: number }): Promise<any> => {
    return requests.post('/api/uav/createOrder', data)
}
// 支付下单
export const postCreateTask = (data: any): Promise<any> => {
    return requests.post('/api/uav/createTask', data)
}
// 任务详情
export const getDetail = (data: { taskId: string }): Promise<TaskItem> => {
    return requests.get('/api/uav/detail', data)
}
// 完成任务
export const postFinishTask = (data: { id: string, userId: string, workPic: string, workRemark: string }): Promise<any> => {
    return requests.post('/api/uav/finishTask', data)
}
// 获取任务分类
export const getTaskCate = (): Promise<any> => {
    return requests.get('/api/uav/getTaskCate')
}
// 登录
export const postLogin = (data: any): Promise<any> => {
    return requests.post('/api/uav/login', data)
}
// 我的任务列表 type 0-我的发单 1-我的接单
export const getMyTask = (params: { pageNum: number, pageSize: number, type: number }): Promise<TaskItem> => {
    return requests.get('/api/uav/myTask', params)
}
// 支付回调
export const getPayNotify = (): Promise<any> => {
    return requests.get('/api/uav/payNotify')
}
// 接单
export const getReceivingTask = (params: { taskId: string }): Promise<any> => {
    return requests.get('/api/uav/receivingTask', params)
}
// 任务大厅 type 排序类型 0-附近 1-最新 2.高佣
export const getTaskList = (params: { pageNum: number, pageSize: number, type: number }): Promise<any> => {
    return requests.get('/api/uav/taskList', params)
}
// 更新用户基本信息
export const postUpdateUserInfo = (data: { avatarUrl?: string, code?: number, nickName?: string }): Promise<any> => {
    return requests.post('/api/uav/updateUserInfo', data)
}
// 获取个人信息
export const getUserInfo = (): Promise<any> => {
    return requests.get('/api/uav/userInfo')
}