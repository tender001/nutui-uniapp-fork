<script setup lang="ts">
import { reactive, ref,watch } from 'vue'
import dayjs from 'dayjs'

const ruleForm = ref<any>(null)
const formData = reactive({
  date: '',//[date2Str(new Date())],
  name: '',
  orderType: '1',
  person: 1,
  money: '',
  remark: '',
  city:[1,7],
  address:'',
  /** 余额抵扣 */
  deduction: false,
  /** 协议 */
  agreement: false,
})
const hasFail = ref(false)
const orderMaps = [{
  label: '普通单',
  value: '1', describe: '普通单服务费', price: 0
}, {
  label: '加急单',
  value: '2', describe: '加急单服务费（含任务推送给30个飞手）', price: 100
}, {
  label: '置顶单',
  value: '3', describe: '置顶单服务费（含任务推送给100个飞手）', price: 300
}]
const selectTypeData = computed(() => {
  const row = orderMaps.find(item => item.value === formData.orderType)
  return row || orderMaps[0]
})
const payTotal = computed(() => {
  const row = orderMaps.find(item => item.value === formData.orderType)
  return selectTypeData.value.price + Number(formData.money || '0')
})
const switchVisible = reactive<Record<string, boolean>>({
  date: false,
  agreement: false,
  ask: false
})
const changeSwitch = (cellKey: string, isShow: boolean) => {
  console.log(cellKey)
  switchVisible[cellKey] = isShow
}
const handleChooseDate = (param: any) => {
  console.log('handleChoosedate', param)
  formData.date = param[3]
}
const handleSelectDate = (param: any) => {
  console.log('handleSelectdate', param)

}
const handleSubmit = () => {
  
  ruleForm.value.validate().then(({ valid, errors }: any) => {
    if (valid){
      console.log('success', formData)
    
      if (!formData.agreement) {
         return uni.showToast({ title:'请阅读并同意服务订单权益条款',icon:"none"})
      }
      uni.requestPayment({
        provider: 'alipay',
        orderInfo: 'orderInfo', //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
        success: function (res) {
            console.log('success:' + JSON.stringify(res));
        },
        fail: function (err) {
            console.log('fail:' + JSON.stringify(err));
        }
    });
      hasFail.value = false
    } else{
      hasFail.value = true
      uni.showToast({ title:'请先完善信息',icon:"none"})
    }
      
  })
}
watch(() => formData, (val) => {
  console.log('formData----',val)
  if(hasFail.value){
    ruleForm.value.validate()
  }
},{ immediate: true,deep:true})


</script>

<template>
  <div class="release-task">
    <nut-form ref="ruleForm"
    :model-value="formData"
    :rules="{
      date: [
        { required: true, message: '请选择日期' },
      ],
      city: [
        { required: true, message: '请选择地区' },
      ],
      money: [
        { required: true, message: '请填写佣金' },
      ],
      remark: [
        { required: true, message: '请填写备注' },
      ],
      person: [
        { required: true, message: '请填写人数' },
      ],
    }">
      <Pilot />
      <nut-form-item label="日期" prop="date" :show-error-message="false">
        <nut-cell  :desc="formData.date ? formData.date : '请选择'"
          @click="changeSwitch('date', true)" is-link />
        <nut-calendar v-model:visible="switchVisible.date" :default-value="formData.date"
          :start-date="dayjs().format('YYYY-MM-DD')" safe-area-inset-bottom @close="changeSwitch('date', false)"
          @choose="handleChooseDate" @select="handleSelectDate" />
      </nut-form-item>
      <!-- <nut-cell-group> -->
        <!-- <pre>2222{{ formData.city }}{{ formData.date }}</pre> -->
        <nut-form-item label="地区" prop="city" :show-error-message="false">
          <Address v-model="formData.city" ></Address>
        </nut-form-item>
        
        <nut-cell is-link>
          <template #title>
            <div>详细地址
              <nut-tag color="#E9E9E9" text-color="#999999"> 非必选 </nut-tag>
            </div>
          </template>
        </nut-cell>
      <!-- </nut-cell-group> -->

      <nut-form-item label="人数" prop="person">
        <nut-input v-model="formData.person" class="nut-input-text" placeholder="请输入人数" type="number"
          input-align="right"><template #right>
            <div>人</div>
          </template></nut-input>
      </nut-form-item>
      <nut-form-item label="佣金" prop="money" :show-error-message="false">
        <nut-input v-model="formData.money" class="nut-input-text" placeholder="请输入金额" type="number"
          input-align="right"><template #right>
            <div>元</div>
          </template></nut-input>
      </nut-form-item>
      <nut-form-item  prop="remark" :show-error-message="false">
        <nut-textarea :rows="3" placeholder="详细的任务描述，更容易让飞手接单哦~（如金额是否包含差旅费、成果交付的要求等）" v-model="formData.remark"
        limit-show :max-length="300" />
      </nut-form-item>

      <!-- <nut-cell  > -->
        <nut-form-item prop="orderType" :show-error-message="false">
          <div class="radio-group-type">
          <nut-radio-group v-model="formData.orderType" direction="horizontal">

            <nut-radio :label="item.value" shape="button" v-for="(item, index) in orderMaps" :key="index">
              <div class="radio-text">{{ item.label }}</div><nut-price :price="item.price" :decimal-digits="0"
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
            <nut-cell>
              <template #title>
                <div class="desc">佣金（若订单免责取消，可全额原路退回）</div>
              </template>
              <template #desc><nut-price :price="formData.money" :decimal-digits="0" size="small" /></template>
            </nut-cell>
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
                <div class="pay-title"><nut-icon @click="switchVisible.ask = true" name="ask2"
                    size="14"></nut-icon>费用说明
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
          确认支付并发布
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




  </div>
</template>

<style lang="scss" scoped>
.release-task {
  padding: 16px;
  background-image: linear-gradient(
    45deg,
    rgb(1 184 92 / 5%) 40%,

    rgb(1 184 92 / 1%),
  );;
  :deep(.nut-form){
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
    :deep(.nut-cell-group__wrap){
      box-shadow:none;
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
