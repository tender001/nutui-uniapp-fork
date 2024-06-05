<template>
    <view class="order-details">
      <view class="fixed-top">
        <view class="fixed-top-title">正在寻找飞手...</view>
        <view class="fixed-top-icon"><nut-icon
            color="#000"
            size="24"
            name="more-x"
            @click="moreVisible=true"
        /></view>

      </view>
      <view class="order-details-body">
        <nut-button custom-class="info-btn" type="default">任务详情<nut-icon custom-style="width: 12px;height: 12px;"  size="16" name="arrow-down"/></nut-button>
        <view class="order-details-card">
            <view class="card-title"><nut-icon
            color="#000"
                custom-style="width: 12px;height: 12px;"
            name="https://oss.6780.cn/pilot/answer_quickly@3x.png"
        />想要更快应答？快来提升飞手接单意愿</view>
            <view class="order-details-cells">
                <nut-cell title="添加佣金" sub-title="佣金更多，增加更多飞手接单" >
                    <template #desc>
                        <nut-button type="primary">去添加</nut-button>
                    </template>
                </nut-cell>
                <nut-cell title="预发费用" sub-title="佣金更多，增加更多飞手接单" >
                    <template #desc>
                        <nut-button type="primary">去支付</nut-button>
                    </template>
                </nut-cell>
            </view>
        </view>
      </view>
      <MorePopup :visible="moreVisible" @close="moreVisible=false"/>
    </view>
  
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  
  const moreVisible = ref(false)

  onMounted(() => {
    uni.showShareMenu({ withShareTicket: true })
  })
  
  </script>
  <route lang="json">{
    "style": {
      "navigationBarTitleText": "订单详情"
    }
  }</route>
  
  <style lang="scss" scoped>
  @import '@packages/styles/theme.scss';
  
  .order-details {
//    bcfcba  bbfbba f2f8f6
    min-height: 100vh;
    background-image: linear-gradient(
    135deg,
    #a7ffa9 40%,

    rgb(1 184 92 / 1%),
    #f2f8f6);
    .fixed-top {
        padding:16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 -1px 4px 0 $primary-color;
        border-radius: 0 0 16px 16px;
        .fixed-top-title {
            @include title();
            font-size: 18px;
        }
        .fixed-top-icon {
            transform: rotate(90deg);
            font-weight: bold;
        }
    }
    .order-details-body {
        padding: 16px;
        :deep(.info-btn){
            background: transparent !important;
            border-color: #000 !important;
            color: #000 !important;
            margin-bottom: 32px;
            .nut-icon {
                width: 12px !important;
                height: 12px !important;
                font-size: 12px;
            }
        }

        .order-details-card {
            border-radius: 32px;
            padding: 4px;
            background-color: #f78245;
            .card-title {
                @include title();
                color: #fff;
                font-size: 14px;
                padding: 0 0 4px 4px;
                display: flex;
                align-items: center;
                :deep(.nut-icon){
                    height: 48px !important;
                    width: 48px !important;
                }
            }
            .order-details-cells {
                background-color: #fff;
                border-radius: 32px;
                overflow: hidden;
                padding: 0 12px;
                :deep(.nut-cell){
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    box-shadow: none !important;
                    .nut-cell__value {
                        flex: unset !important;
                    }
                    .title {
                        @include title();
                        font-size: 16px;
                    }
                }

            }
        }
    }
  }
  </style>