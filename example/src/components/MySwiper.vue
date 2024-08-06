<template>
    <view class="my-swiper">
        <!--  :auto-play="3000" -->
        <nut-swiper @change="onChange">
            <nut-swiper-item v-for="(item, index) in list" :key="index"
                custom-style="height: 136px; border-radius: 16px; overflow: hidden;">
                <image :src="item" class="swiper-img" mode="widthFix" :draggable="false"
                    @click="handleBannerClick(index)" />
            </nut-swiper-item>
            <!-- <template #page>
                <div class="swiper-pagination"> {{ val }}/4 </div>
            </template> -->
        </nut-swiper>
    </view>
</template>
<script setup lang="ts">
import { redirectTo } from '@/utils';
import { ref } from 'vue'
const list = ref([
    'https://oss.6780.cn/pilot/banner1.jpg',
    'https://oss.6780.cn/pilot/banner2.jpg',
])
const val = ref(1)
const onChange = (index: number) => {
    val.value = index + 1
}
const handleBannerClick = (index: number) => {
    console.log('handleBannerClick--', index)
    redirectTo('/pages/user/auth/pilot')

}
</script>

<style lang="scss" scoped>
.my-swiper {
    margin-top: 16px;

    .swiper-img {
        width: 100%;
    }

    :deep(.nut-swiper-item) {
        border-radius: 16px;
        overflow: hidden;
    }

    .swiper-pagination {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 46px;
        height: 22px;
        background: rgba(0, 0, 0, 0.33);
        border-radius: 22px;
        text-align: center;
        color: #fff;
        font-size: 14px;
    }
}
</style>