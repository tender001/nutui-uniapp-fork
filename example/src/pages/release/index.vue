<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import dayjs from 'dayjs'
// import { type TaskItem } from '@/api/type.d'
import { postCreateTask } from '@/api/uav'
import { useUserStore } from '@/store/user'
import { redirectTo, showToast } from '../../utils'
import { orderMaps } from '@/utils/constant'
import { useAppStore } from '@/store'
import type { FormInst } from 'nutui-uniapp'
import { getToken } from '@/packages/utils'

const appStore = useAppStore()
// appStore.setEnums()

const ruleForm = ref<FormInst>()
const formData = reactive<any>({
  expectServiceTime: dayjs().format('YYYY-MM-DD'),
  taskCategory: [],
  taskCategoryRow: {},
  name: '',
  orderType: '1',
  acreNum: undefined,
  remark: '',
  price: '',
  concatPhone: '',
  address: '',
  /** 余额抵扣 */
  deduction: false,
  /** 协议 */
  agreement: false,
})
const hasFail = ref(false)
const userPopup = ref(false)
const addressInfo = ref<any>({})

const userStore = useUserStore()
const userinfo = computed(() => userStore.userinfo)
const categoryList = computed(() => {
  return (appStore.enums.cate[0]?.categoryList || []).map(item => {
    return {
      ...item,
      text: item.name,
      value: item.id
    }
  })
})
const selectTypeData = computed(() => {
  const row = orderMaps.find(item => item.value === formData.orderType)
  return row || orderMaps[0]
})
const payTotal = computed(() => {
  return (selectTypeData.value.price || 0) + (Number(formData.acreNum || 0) * (formData.taskCategoryRow?.price || formData.price))
})
const switchVisible = reactive<Record<string, boolean>>({
  expectServiceTime: false,
  agreement: false,
  ask: false,
  pay: false
})
const changeSwitch = (cellKey: string, isShow: boolean) => {
  console.log(cellKey)
  switchVisible[cellKey] = isShow
}
const handleChooseDate = (param: any) => {
  console.log('handleChoosedate', param)
  formData.expectServiceTime = param[3]
}
const handleSelectDate = (param: any) => {
  console.log('handleSelectdate', param)

}
const handleTaskCategoryChange = ({ selectedValue, selectedOptions }: any) => {
  formData.taskCategory = selectedValue
  formData.taskCategoryRow = selectedOptions[0]
  formData.price = selectedOptions[0]?.price || ''
  changeSwitch('taskCategory', false)
}
const submitParams = computed<any>(() => {
  return {
    ...formData,
    // city: formData.city.toString(),
    expectServiceTime: dayjs(formData.expectServiceTime).format("YYYY-MM-DD HH:mm:ss"),
    taskCategory: formData.taskCategory[0],
    price: formData.taskCategoryRow.price,
    totalPrice: payTotal.value,
    "concatName": userinfo.value.nickName,
    concatPhone: formData.concatPhone || userinfo.value.phone,
    remark: formData.remark,
    extData: JSON.stringify({
      remark: formData.remark,
      money: payTotal.value,
      addressInfo: addressInfo.value
    }),
  }
})
const handleSubmit = () => {

  ruleForm.value?.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      console.log('success', formData)

      if (!formData.agreement) {
        return showToast('请阅读并同意服务订单权益条款')
      }
      switchVisible.pay = true

      hasFail.value = false
    } else {
      hasFail.value = true
      uni.showToast({ title: '请先完善信息', icon: "none" })
    }

  })
}
onShareAppMessage(() => {
  return {
  }
})

onMounted(async () => {
  uni.showShareMenu({ withShareTicket: true })
  // await userStore.setUserinfo()
  if (getToken()) {
    await userStore.setUserinfo()
    if (userinfo.value.userId && !userinfo.value.phone) {
      userPopup.value = true
    }
    formData.concatPhone = userinfo.value.phone || ''
  }


  setTimeout(() => {
    const taskCategoryRow = categoryList.value[0]
    // formData.taskCategoryRow = taskCategoryRow
    // formData.taskCategory = [taskCategoryRow.id]
    handleTaskCategoryChange({ selectedValue: [taskCategoryRow.id], selectedOptions: [taskCategoryRow] })
  }, 600);
})
watch(() => formData, (val) => {
  console.log('formData----', val)
  if (hasFail.value) {
    ruleForm.value?.validate()
  }
}, { immediate: true, deep: true })

const handleChooseAddress = () => {
  uni.chooseLocation({
    success: (res) => {
      console.log('res--success', res)
      formData.address = res.name
      formData.latitude = res.latitude
      formData.longitude = res.longitude
      addressInfo.value = res
    },
    fail: (res) => {
      console.log('res--fail', res)

    }
  })
}
const handlePay = async (payType: number) => {
  const { data, code } = await postCreateTask({
    ...submitParams.value,
    payType
  })
  // 未绑定手机号
  if (code === 101) {
    userPopup.value = true
    return
  }
  if (payType === 1) {
    uni.requestPayment({
      ...data,
      package: data.package || data.packageValue,
      success: (res: any) => {
        console.log('success--', res)
        showToast('发布成功')
        handleReset()
        redirectTo('/pages/details/index?id=' + data.id)
      },
      fail: (res: any) => {
        console.log('fail--', res)
      },
    });

  } else {
    showToast('发布成功')
    handleReset()
    redirectTo('/pages/details/index?id=' + data)
  }

}
const handleReset = () => {
  switchVisible.pay = false
  ruleForm.value?.reset()
}


</script>

<template>
  <div class="release-task">
    <nut-form ref="ruleForm" :model-value="formData" :rules="{
      taskCategory: [
        { required: true, message: '请选择任务类型' },
      ],
      price: [
        { required: true, message: '请填写单价' },
      ],
      expectServiceTime: [
        { required: true, message: '请选择日期' },
      ],
      address: [
        { required: true, message: '请选择地址' },
      ],
      concatPhone: [
        { required: true, message: '请填写联系电话' },
      ],
      // money: [
      //   { required: true, message: '请填写佣金' },
      // ],
      remark: [
        { required: true, message: '请填写备注' },
      ],
      acreNum: [
        { required: true, message: '请填写面积' },
      ],
    }">
      <!-- <Pilot @change="" /> -->
      <!-- <nut-form-item label="任务类型" prop="address">
        <nut-picker v-model="formData.taskCategory" :columns="categoryList" :title="String(val)" @confirm="confirm" />
      </nut-form-item> -->
      <!--   -->
      <nut-form-item label="任务类型" prop="taskCategory" :show-error-message="false">
        <nut-cell :desc="formData.taskCategoryRow?.text ? formData.taskCategoryRow?.text : '请选择'"
          @click="changeSwitch('taskCategory', true)" is-link />

        <nut-popup v-model:visible="switchVisible.taskCategory" position="bottom">
          <nut-picker v-model="formData.taskCategory" :columns="categoryList" title="请选择任务类型"
            @confirm="handleTaskCategoryChange" @cancel="changeSwitch('taskCategory', false)" />
        </nut-popup>
      </nut-form-item>
      <nut-form-item label="单价" prop="price" :show-error-message="false">
        <nut-input v-model="formData.price" class="nut-input-text" placeholder="请填写单价" type="number"
          input-align="right"><template #right>
            <div>元</div>
          </template></nut-input>
      </nut-form-item>
      <nut-form-item label="日期" prop="expectServiceTime" :show-error-message="false">
        <nut-cell :desc="formData.expectServiceTime ? formData.expectServiceTime : '请选择'"
          @click="changeSwitch('expectServiceTime', true)" is-link />
        <nut-calendar v-model:visible="switchVisible.expectServiceTime" :default-value="formData.expectServiceTime"
          :start-date="dayjs().format('YYYY-MM-DD')" safe-area-inset-bottom
          @close="changeSwitch('expectServiceTime', false)" @choose="handleChooseDate" @select="handleSelectDate" />
      </nut-form-item>
      <nut-form-item label="联系电话" prop="concatPhone">

        <nut-input v-model="formData.concatPhone" class="nut-input-text" placeholder="请填写联系电话" type="tel"
          input-align="right"></nut-input>

      </nut-form-item>
      <nut-form-item label="详细地址" prop="address">

        <nut-cell :desc="formData.address ? formData.address : '请选择'" @click="handleChooseAddress" is-link />

      </nut-form-item>

      <!-- </nut-cell-group> -->

      <nut-form-item label="面积" prop="acreNum">
        <nut-input v-model="formData.acreNum" class="nut-input-text" placeholder="请填写面积" type="number"
          input-align="right"><template #right>
            <div>亩</div>
          </template></nut-input>
      </nut-form-item>
      <!-- <nut-form-item label="佣金" prop="money" :show-error-message="false">
        <nut-input v-model="formData.money" class="nut-input-text" placeholder="请填写金额" type="number"
          input-align="right"><template #right>
            <div>元</div>
          </template></nut-input>
      </nut-form-item> -->
      <nut-form-item prop="remark" :show-error-message="false">
        <nut-textarea :rows="3" placeholder="详细的任务描述，更容易让飞手接单哦~（如金额是否包含差旅费、成果交付的要求等）" v-model="formData.remark"
          limit-show :max-length="300" />
      </nut-form-item>

      <!-- <nut-cell  > -->
      <nut-form-item prop="orderType" :show-error-message="false">
        <div class="radio-group-type">
          <nut-radio-group v-model="formData.orderType" direction="horizontal">

            <nut-radio :label="item.value" shape="button" v-for="(item, index) in orderMaps" :key="index">
              <div class="radio-text">{{ item.text }}</div><nut-price :price="item.price" :decimal-digits="0"
                size="normal" />
            </nut-radio>

          </nut-radio-group>
        </div>
      </nut-form-item>
      <!-- </nut-cell> -->
      <!-- <nut-cell>
        <div class="radio-group-type">
          <nut-radio-group v-model="formData.orderType" direction="horizontal">

            <nut-radio :label="item.value" shape="button" v-for="(item, index) in orderMaps" :key="index">
              <div class="radio-text">{{ item.label }}</div><nut-price :price="item.price" :decimal-digits="0"
                size="normal" />
            </nut-radio>

          </nut-radio-group>
        </div>

      </nut-cell> -->
      <div class="pay-card">
        <nut-cell-group>
          <div class="cell-title">
            <nut-cell>
              <template #title>
                <div>费用合计</div>
              </template>
              <template #desc><nut-price :price="payTotal" :decimal-digits="0" size="large" /></template>
            </nut-cell>
          </div>


          <div class="cell-desc">
            <!-- <nut-cell>
              <template #title>
                <div class="desc">佣金（若订单免责取消，可全额原路退回）</div>
              </template>
              <template #desc><nut-price :price="formData.money" :decimal-digits="0" size="small" /></template>
            </nut-cell> -->
            <nut-cell>
              <template #title>
                <div>{{ selectTypeData?.describe }}</div>
              </template>
              <template #desc><nut-price :price="selectTypeData?.price" :decimal-digits="0" size="small" /></template>
            </nut-cell>

          </div>
          <nut-cell>
            <template #title>
              <div class="deduction-title">余额 <div class="deduction-money"> -可抵扣 ￥0</div>
              </div>
            </template>
            <template #desc><nut-checkbox text-position="left" v-model="formData.deduction">
              </nut-checkbox></template>
          </nut-cell>
          <div class="cell-footer">
            <nut-cell>
              <template #title>
                <div class="pay-title"><nut-icon @click="switchVisible.ask = true" name="ask2" size="14"></nut-icon>费用说明
                </div>
              </template>
              <template #desc>
                <div class="pay-total">
                  <div class="deduction">已抵扣￥0，剩余支付</div> <nut-price :price="payTotal" :decimal-digits="0"
                    size="large" />
                </div>
              </template>
            </nut-cell>
          </div>
        </nut-cell-group>
      </div>
      <div class="footer-btn">
        <nut-checkbox v-model="formData.agreement">
          <div>我已阅读并同意</div>
          <div class="link" @click="switchVisible.agreement = true">《服务订单权益条款》</div>
        </nut-checkbox>
        <nut-button type="primary" size="large" @click="handleSubmit">
          发布任务
        </nut-button>
      </div>
      <nut-popup v-model:visible="switchVisible.agreement" @close="switchVisible.agreement = false" position="bottom"
        closeable round :style="{ height: '30%' }">
        <div class="popup-content">
          <div class="popup-title">《服务订单权益条款》</div>
          <div class="popup-items">


            1、为保障您的权益，请勿私下与接单方交易。<br />
            2、请确保您发布的服务是真实的任务需求，若有用户投诉虚假订单，平台将对您的账号进行封停管理。<br />
            3、接单后，由于发单方原因取消订单，将扣除订单金额的30%作为接单方的补偿。<br />
            4、接单后，由于接单方原因取消订单，您将获得订单金额20%的补偿金。<br />
            5、订单处于抢单状态，发单方取消订单无需扣除费用，资金将退回到支付账户中。

          </div>
        </div>

      </nut-popup>
      <nut-popup v-model:visible="switchVisible.ask" @close="switchVisible.ask = false" position="bottom" closeable
        round :style="{ height: '30%' }">
        <div class="popup-content">
          <div class="popup-title">费用说明</div>
          <div class="popup-items">


            1、发布任务订单，您的<text class="link">可用余额需>=订单总金额</text>，订单发布成功后，此金额将临时冻结。<br />
            2、发单方无责取消订单，此费用会原路退回；<br />
            3、订单正常过期，此费用会原路退回；<br />
            4、由于发单方责任导致订单不能完成，此费用会扣除剩余70%退回到零钱。30%作为接单方的补偿金，

          </div>
        </div>

      </nut-popup>


    </nut-form>
    <PayPopup :visible="switchVisible.pay" @ok="handlePay" :money="payTotal" @close="switchVisible.pay = false" />

    <UserPopup :visible="userPopup" @close="userPopup = false" />

  </div>
</template>

<style lang="scss" scoped>
.release-task {
  padding: 16px;
  background-image: linear-gradient(45deg,
      rgb(1 184 92 / 5%) 40%,

      rgb(1 184 92 / 1%),
    );
  ;

  :deep(.nut-form) {
    .nut-cell-group__wrap {
      background: transparent;
      box-shadow: none;
      margin: 0;

      .nut-cell-group__wrap {
        background: transparent;
        box-shadow: $cell-box-shadow;
        margin: 10px 0;
      }
    }
  }

  :deep(.nut-textarea) {
    // border-radius: $cell-border-radius;
    // box-shadow: $cell-box-shadow;
    color: $title-color;
    font-size: $cell-title-font;
    height: 100px;
  }

  :deep(.nut-cell__title) {
    // font-weight: bold;
    color: $title-color;
    font-size: $cell-title-font;

    .nut-tag {
      font-size: 10px;
      height: 14px !important;
    }
  }

  :deep(.nut-cell__value) {
    // font-weight: bold;
    color: $title-color;
    font-size: $cell-title-font;

    .nut-form-item__body__slots {
      .nut-cell {
        padding: 0;
        justify-content: flex-end;
      }
    }
  }

  .radio-group-type {
    display: flex;
    width: 100%;

    :deep(.nut-radio-group) {
      display: flex !important;
      width: 100%;
      align-items: center;

      .nut-radio {
        flex: 1;

        .nut-radio__button {
          display: flex;
          flex-direction: column;
          padding: 4px;
          width: 100%;

          .radio-text {
            font-weight: bold;
            font-size: $cell-title-font;
          }
        }
      }

      .nut-radio:last-child {
        margin-right: 0 !important;
      }

    }
  }

  .pay-card {
    :deep(.nut-cell-group__wrap) {
      box-shadow: none;
    }

    .cell-title {
      :deep(.nut-cell) {
        font-weight: bold;
        padding-bottom: 0;

        .nut-price {
          color: $title-color;
        }
      }
    }

    :deep(.nut-cell__value) {
      flex: none;

      .nut-checkbox {
        margin-right: 0;
      }

    }

    .deduction-title {
      display: flex;
      align-items: center;

      .deduction-money {
        padding-left: 4px;
        color: $primary-color;
      }
    }

    .cell-desc {
      :deep(.nut-cell) {
        padding: 0 16px;

        .nut-cell__title {
          font-size: 12px;
          color: $dark-color-gray !important;
        }

        .nut-price {
          color: $dark-color-gray !important;
        }
      }

    }

    .cell-footer {
      .pay-title {
        display: flex;
        align-items: center;
        font-weight: 400;

        :deep(.nut-icon) {
          color: $dark-color-gray !important;
        }
      }

      .pay-total {
        display: flex;
        font-weight: bold;

        .deduction {
          padding-right: 4px;
          // color:
        }
      }
    }
  }

  .footer-btn {
    padding: 16px;

    :deep(.nut-checkbox) {
      padding-bottom: 16px;
    }

    :deep(.nut-checkbox__label) {
      margin-left: 4px;
      display: flex;
      align-items: center;

      .link {
        color: $primary-color;
      }
    }
  }
}

.popup-content {
  padding: 16px;

  .popup-title {
    font-weight: bold;
    color: $title-color;
    font-size: 16px;
    text-align: center;
  }

  .popup-items {
    padding: 16px 0;
    line-height: 32px;
    color: $title-color;

    .link {
      color: $primary-color;
    }

  }
}
</style>

<route lang="json">{
  "style": {
    "navigationBarTitleText": "发布任务"
  }
}</route>
