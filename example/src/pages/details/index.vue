<script setup lang="ts">
import { redirectBack } from '@/utils/index'

const details = ref({})
function handleBack() {
  redirectBack()
}
</script>

<template>
  <!-- <nut-navbar
    title=""
    left-show
    @click-back="handleBack"
  /> -->
  <div class="ana-details">

    <AnaCard mode="detail" :data="details" />
    <div class="fixed-nav">
      <div class="fixed-nav-item"> <nut-icon
        name="refresh2"
        custom-color="#fff"
      /></div>
      <div class="fixed-nav-item"> <nut-icon name="https://oss.6780.cn/ana/step-forward.png" size="24" custom-color="#fff" /></div>
    </div>
    <nut-tabbar :bottom="true">
      <nut-tabbar-item id="target1" icon="https://oss.6780.cn/ana/ana-collect.png" tab-title="收藏" />
      <nut-tabbar-item id="target2" icon="https://oss.6780.cn/ana/ana-copy.png" tab-title="复制文案" />
      <nut-tabbar-item id="target3" icon="https://oss.6780.cn/ana/ana-download.png" tab-title="下载图片" />
      <nut-tabbar-item id="target4" icon="https://oss.6780.cn/ana/ana-share.png" tab-title="分享" />
    </nut-tabbar>
  </div>
</template>

<route lang="json">
{
    "style": {
        "navigationBarTitleText": "详情"
    }
}
</route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.ana-details {
    padding: 16px;
    .fixed-nav {
        position: fixed;
        bottom: 20vh;
        right: 24px;
        &-item {
            width: 48px;
            height: 48px;
            background: $primary-color;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 48px;
            border-radius: 50%;
            box-shadow: $cell-box-shadow;
            :deep(.nut-icon) {
                font-size: 24px;
                width: 28px;
                height: 28px;
            }
        }
        .fixed-nav-item + .fixed-nav-item {
            margin-top: 24px;
        }
    }
}
</style>
