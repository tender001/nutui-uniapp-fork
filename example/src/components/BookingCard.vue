<template>
  <view class="booking-card">

    <view class="booking-card-top">
      <!-- typeList -->
      <nut-grid :column-num="4">
        <nut-grid-item @click="navigateTo(`/pages/release/index?id=${item.id}`)" v-for="(item, index) in typeList"
          :text="item.typeName" :key="index">
          <image style="width: 32px;" mode="widthFix" :src="item.typeImg" />
        </nut-grid-item>

      </nut-grid>
    </view>
    <view class="booking-welcome">
      <image class="booking-welcome-icon" mode="widthFix"
        src="https://oss.6780.cn/pilot/%E9%A6%96%E9%A1%B5%E6%B2%9F%E9%80%9A%E6%9D%A1%E5%B7%A6%E4%BE%A7icon%403x.png" />
      <text>欢迎使用青创农服</text>
    </view>
    <view class="booking-content">
      <nut-button custom-style="font-weight: bold" type="primary"
        @click="navigateTo('/pages/release/index')">发布飞行任务</nut-button>
      <view class="booking-service"><button open-type="contact" class="service-btn">联系客服发单</button> <nut-icon size="14"
          name="right" />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { redirectTo } from '@/utils/index'
const typeList = [
  {
    "id": 47,
    "typeName": "演示服务",
    "typeImg": "http://file.iuav.com/file/8449616a-3d1f-4f8a-8728-06408a4bc735.png",
    "description": "演示",
    "saleState": 1,
    "createTime": "2023-09-08 16:48:22",
    "inspectionName": null
  },
  {
    "id": 46,
    "typeName": "电力巡检",
    "typeImg": "http://file.iuav.com/file/b38906ae-e64d-4936-adff-0f99756b30ee.png",
    "description": "电力巡检",
    "saleState": 1,
    "createTime": "2023-08-19 14:16:23",
    "inspectionName": null
  },
  {
    "id": 45,
    "typeName": "航拍航测",
    "typeImg": "http://file.iuav.com/file/881eddae-5f80-4661-a6b0-f2c1ad2e4d6e.png",
    "description": "航拍航测",
    "saleState": 1,
    "createTime": "2023-08-19 14:16:09",
    "inspectionName": null
  },
  {
    "id": 44,
    "typeName": "农业植保",
    "typeImg": "http://file.iuav.com/file/deae672d-5771-48c9-961b-4dcf466e1abe.png",
    "description": "农业植保",
    "saleState": 1,
    "createTime": "2023-08-19 14:12:33",
    "inspectionName": null
  },
  {
    "id": 43,
    "typeName": "建筑",
    "typeImg": "http://file.iuav.com/file/a9c153bc-5a56-420f-9566-c6d547d88f6e.png",
    "description": "建筑",
    "saleState": 1,
    "createTime": "2023-08-19 14:12:09",
    "inspectionName": null
  },
  {
    "id": 42,
    "typeName": "公共安全",
    "typeImg": "http://file.iuav.com/file/7eb2342a-71b3-4827-b534-36a73efc396e.png",
    "description": "公共安全",
    "saleState": 1,
    "createTime": "2023-08-19 14:07:55",
    "inspectionName": null
  },
  {
    "id": 39,
    "typeName": "交通安全",
    "typeImg": "http://file.iuav.com/file/d5687ac2-0b25-429a-8e7c-3eb95e6e6add.png",
    "description": "交通安全",
    "saleState": 1,
    "createTime": "2023-08-19 14:06:31",
    "inspectionName": null
  },
  {
    "id": 38,
    "typeName": "应急救援",
    "typeImg": "http://file.iuav.com/file/dc9c8f7f-a9c9-4290-8fa1-14ed43156fad.png",
    "description": "应急救援",
    "saleState": 1,
    "createTime": "2023-08-19 14:05:24",
    "inspectionName": null
  },
  {
    "id": 37,
    "typeName": "消防巡查",
    "typeImg": "http://file.iuav.com/file/16d37614-bb93-4a5e-843a-344bc8fd1c46.png",
    "description": "消防巡查",
    "saleState": 1,
    "createTime": "2023-08-19 14:05:07",
    "inspectionName": null
  },
  {
    "id": 36,
    "typeName": "城市管理",
    "typeImg": "http://file.iuav.com/file/498d42dc-927c-4e16-8266-ceeabfa27aa6.png",
    "description": "城市管理",
    "saleState": 1,
    "createTime": "2023-08-19 14:04:49",
    "inspectionName": null
  },
  {
    "id": 35,
    "typeName": "环境保护",
    "typeImg": "http://file.iuav.com/file/4b0994ab-6efe-47d2-a246-f471cd69b436.png",
    "description": "环境保护",
    "saleState": 1,
    "createTime": "2023-08-19 14:04:40",
    "inspectionName": null
  },
  {
    "id": 34,
    "typeName": "水利",
    "typeImg": "http://file.iuav.com/file/a8558d1a-b2c4-4ce0-ada9-7a878f495cd0.png",
    "description": "水利",
    "saleState": 1,
    "createTime": "2023-08-19 14:04:04",
    "inspectionName": null
  }
]
// const  list = res
const navigateTo = (path: string) => {
  redirectTo(path)
}
</script>

<style lang="scss" scoped>
.booking-card {
  margin-top: -170px;
  z-index: 10;
  position: relative;
  border: 2px solid #fff;
  border-radius: 32px;
  overflow: hidden;
  // padding: 16px;
  // background: #fff;

  .booking-card-top {
    // padding-bottom: 16px;

    :deep(.nut-grid-item__content) {
      background: transparent !important;
    }

  }

  .booking-welcome {
    background: #cdf9ca;
    border-radius: 32px 32px 0 0;
    color: $primary-color;
    display: flex;
    margin-left: -2px;
    margin-right: -2px;
    padding: 8px 16px;
    font-size: 16px;

    .booking-welcome-icon {
      width: 64px;
    }

    text {
      margin-top: 6px;
      font-size: 16px;
    }
  }

  .booking-content {
    background: #fff;
    border-radius: 32px;
    margin-left: -2px;
    margin-right: -2px;
    padding: 8px 16px;
    margin-top: -24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .booking-service {
      color: #888;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }

}
</style>