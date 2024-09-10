/** 基础字段类型 */
export interface BasicField {
  /** 字段label名称 */
  label: string | VNode
  /** 字段标识 */
  key: string
  /** 字段校验规则 */
  rule?: FieldRule[]
  /** 字段label宽度 */
  labelWidth?: string
  /** 是否为不可编辑状态 */
  readonly?: boolean
  /** 是否为禁用状态 */
  disabled?: boolean
  /** 是否允许清除 */
  clearable?: boolean
  /** 字段是否隐藏 */
  hidden?: boolean
  /** 字段隐藏时是否清空对应表单字段的值 */
  clearValueOnHidden?: boolean
  /** 字段占位提示 */
  placeholder?: string
  /** 帮助提示 */
  helpTip?: string
  /** 字段启用状态 */
  status?: boolean
  /** 字段项前缀 */
  prefix?: string | VNode
  /** 字段项后缀 */
  suffix?: string | VNode
  /** 单元格点击时触发，fulfilled时则继续弹出选项popup, rejected则中止 */
  onCellClick?: () => Promise<void>
  /** 自定义渲染cell */
  render?: VNode | ((value: any) => VNode)
  /** 最小时间 */
  minDate?: Date
}
export interface AddressField extends BasicInputField {

  valueType: any[]
}
