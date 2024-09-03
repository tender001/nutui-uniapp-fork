/** 接口响应 */
export interface Response<T = any> {
  code: number;
  data: T;
  msg: string;
}
export interface Page<T = any> {
  pageNum: number
  pageSize: number
  pages: number
  total: number
}
page.total
// export interface ResponsePage<T = any> export Response {
//   code: number;
//   data: {};
//   msg: string;
// }


export interface AuthRow {
  // 电子执照
  electronicLicense?: string;
  // 扩展信息
  extData?: string;
  // 身份证反面
  idCardBack?: string;
  // 身份证正面
  idCardFront?: string;
  // 身份证号码
  idCardNo?: string;
  // 真实姓名
  realName?: string;
  // 状态
  state?: number;
  // 用户ID
  userId?: number;
}

export interface TaskItem {
  /** 多少亩，可选 */
  acreNum?: number;
  /** 任务地址，可选 */
  address?: string;
  /** 发布人头像，可选 */
  avatar?: string;
  /** 联系人姓名，可选 */
  concatName?: string;
  /** 农户联系人手机号，可选 */
  concatPhone?: string;
  /** 完成时间，可选 */
  finishTime?: string;
  /** 纬度，可选 */
  latitude?: number;
  /** 经度，可选 */
  longitude?: number;
  /** 飞手头像，可选 */
  manipulatorsUserAvatar?: string;
  /** 飞手用户id，可选 */
  manipulatorsUserId?: number;
  /** 飞手昵称，可选 */
  manipulatorsUserNickName?: string;
  /** 飞手联系方式，可选 */
  manipulatorsUserPhone?: string;
  /** 发布人昵称，可选 */
  nickName?: string;
  /** 订单类型：0.普通单 1.加急单 2.置顶单，可选 */
  orderType: number;
  /** 价格(单位：分)，可选 */
  price?: number;
  commission?: number;
  /** 接单时间，可选 */
  receivingTime?: string;
  /** 创建时间 */
  createTime?: string;
  /** 完成时间 */
  finishTime?: string;
  /** 期望服务时间 */
  expectServiceTime?: string;
  /** 状态 -1.待发布(线上待支付) 0.待接单 1.已接单 2.进行中 3.已完成 4.已取消 */
  state?: number;
  stateName?: number;
  /** 任务分类，可选 */
  taskCategory: number;
  taskCategoryName?: string;
  // 发布人id，可选
  userId?: number;
  /** 作业照片，可选 */
  workPic?: string;
  /** 签字照片，可选 */
  signPic?: string;
  /** 作业备注，可选 */
  workRemark?: string;
  money?: string;
  /** 任务备注 */
  remark?: string;
  /** 支付类型 0 线下 1线上 */
  payType?: number;
  /** 支付状态 0.待支付 1.已支付 */
  payState?: number;
  id?: number;
  taskNo?: string;
  /** 订单总价 */
  totalPrice: string;



}