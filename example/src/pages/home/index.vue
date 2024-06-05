<template>
  <div class="home">
   <div class="user-tabs">
      <div class="user-tabs-title">小白菜</div>
      <nut-avatar class="user-tabs-avatar" > <img @click="navigateTo('/pages/my/index')" src="https://oss.6780.cn/pilot/avatar.png" /> </nut-avatar>
      <nut-tabs v-model="userType" size="large" type="smile">
        <nut-tab-pane title="农户" pane-key="1">
          <div>
            <image class="tabs-image" mode="widthFix" src="https://oss.6780.cn/pilot/feishu.png"/>
            <div class="home-content">
              <BookingCard/>
              <!-- <nut-button size="large" type="primary" @click="navigateTo('/pages/release/index')">发布飞行任务</nut-button> -->

              <CurOrder/>
              <MySwiper/>
            </div>
          </div>
        </nut-tab-pane>
        <nut-tab-pane title="飞手" pane-key="2">
          <div v-if="pilotStatus===1">
            <image @click="navigateTo('/pages/bookingHall/index')" class="tabs-image" mode="widthFix" src="https://oss.6780.cn/pilot/WX20240522-091002.png"/>
            <div class="home-content">
              
              <!-- <nut-button size="large" type="primary">立即接单</nut-button> -->
            </div>
          </div>
          <div v-else>
            <image class="tabs-image" mode="widthFix" src="https://oss.6780.cn/pilot/WX20240521-223711%402x.png"/>
            <div class="home-content">
              <nut-button size="large" type="primary">立即成为飞手</nut-button>
            </div>
          </div>
        </nut-tab-pane>
        
      </nut-tabs>
   </div>
  </div>
 
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import {redirectTo} from '@/utils/index'



const userType = ref('1')
const pilotStatus = ref(1)
onShareAppMessage(()=>{
    return {
        title: '分享的标题',
        desc: 'unibest 演示示例',
        // path: '/pages/index/index',
        imageUrl: '' // 分享卡片的图片，可选
    }
})
const navigateTo = (path:string) => {
  redirectTo(path)
}
</script>
<route lang="json">
  {
    "type":"home"
  }
  </route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';
.home {
  // background: #edf3f6;
  background-image: linear-gradient(
    180deg,
    #a7ffa9 40%,

    rgb(1 184 92 / 1%),
    #f2f8f6);
    min-height: 100vh;
  .user-tabs {
    // background: $uni-nav-bg-color;
    width: 100vw;
    :deep(.nut-grid-item__content){
        background: transparent !important;
    }
    .user-tabs-title {
      padding: 16px 0;
      background: $uni-nav-bg-color;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }
    :deep(.nut-avatar) {
      position: absolute;
      right: 16px;
      background-color: #000 !important;
      padding: 2px;
      
      z-index: 100;
      image {
        margin-top: -1px;
      }
    }
    
    :deep(.nut-tabs){
      .nut-tabs__list {
        background: $uni-nav-bg-color;
        padding: 0 8px 16px;
        .nut-tabs__titles-item {
          
          flex: unset;
          .nut-icon {
            color: $uni-tab-select-color;
            font-size: 18px;
            // width: 20px;
          }
          .booking-card {
            margin-top: -80px;
          }
        }
        .nut-tabs-active {
          font-size: 22px;
          .nut-tabs__titles-item__smile {
            bottom: 0;
          }
        }
      }
      .nut-tab-pane {
        padding: 0;
        background: #edf3f6;
        .tabs-image {
          width: 100vw;
          height: unset;
        }
      }
    }
    .home-content {
      padding: 16px;
    }
  }
  :deep(.nut-button--large){
    font-weight: bold;
  }

}
.my-swiper {
  .nut-swiper-inner {
    min-height: 300rpx;
  }
  .nut-swiper-item {
    color: #fff;
    font-size: 32rpx;
    line-height: 300rpx;
    text-align: center;
    background-color: $primary-color;
  }
}

// .tabs {
//   margin-top: 24rpx;
//   .tab-pane {
//     padding: 0;
//     background: $bg-color;
//   }
// }
</style>
