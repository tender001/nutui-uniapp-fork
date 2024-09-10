<script setup lang="ts">
import { computed } from 'vue'

const featuredList = ref([{
  url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  title: '创业启示录',
}, {
  url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  title: '自媒体IP',
}, {
  url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  title: '私域营销',
}, {
  url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  title: '生财有道',
}, {
  url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  title: '总有人爱你',
}, {
  url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
  title: '岁月漫长',
}])
</script>

<template>
  <div class="ana-featured">
    <div class="ana-featured-header">
      <div class="ana-featured-header-left">
        精选集合
      </div>
      <div class="ana-featured-header-right">
        更多<nut-icon name="arrow-right" custom-color="#c0c5cf" />
      </div>
    </div>
    <div class="ana-featured-body">

      <scroll-view :scroll-x="true" class="featured-list">
        <div v-for="(item, index) in featuredList" :key="index" class="featured-list-item">
          <img class="img" :src="item.url">
          <div class="title">{{ item.title }}</div>
        </div>
      </scroll-view>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';
.ana-featured {
    padding: 16px 0;
    &-header {
        @include flex;
        &-left {
            @include title;
        }
        &-right {
            color: $weak-color;
            display: flex;
            align-items: center;
        }
    }
    &-body {
        padding: 16px 0;
       .featured-list {
        white-space: nowrap;
        &-item {
            width: 24vw;
            display: inline-block;
            .img {
                width: 24vw;
                height: 24vw;
                border-radius: 4px;
            }
            .title {
                @include textsm;
                text-align: center;
            }
        }
        .featured-list-item + .featured-list-item {
            margin-left: 16px;
        }

       }

    }

}
</style>
