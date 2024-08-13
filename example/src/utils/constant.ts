/** 执照类型 */
export const licenseTypeList = [{
    text: 'CAAC',
    value: 'caac'
}, {
    text: 'UTC',
    value: 'utc'
}, {
    text: '其他',
    value: 'other'
}]
// -1.待发布 0.待接单 1.已接单 2.进行中 3.已完成 4.已取消
export const orderStateList = [{
    text: '待支付',
    value: -1
}, {
    text: '待接单',
    value: 0
}, {
    text: '已接单',
    value: 1
}, {
    text: '进行中',
    value: 2
}, {
    text: '已完成',
    value: 3
}, {
    text: '已取消',
    value: 4
}]

export const orderMaps = [{
    text: '普通单',
    value: '1', describe: '普通单服务费', price: 0
}, {
    text: '加急单',
    value: '2', describe: '加急单服务费（含任务推送给30个飞手）', price: 100
}, {
    text: '置顶单',
    value: '3', describe: '置顶单服务费（含任务推送给100个飞手）', price: 300
}]
