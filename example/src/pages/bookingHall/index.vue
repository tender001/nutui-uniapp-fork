<template>

    <view class="booking-hall">
        <nut-sticky top="57">

            <nut-tabs v-model="active" type="smile" size="large" custom-class="tabs">
                <nut-tab-pane custom-class="tab-pane" title="附近">
                    <List tab="附近" :data="list" />
                </nut-tab-pane>
                <nut-tab-pane custom-class="tab-pane" title="最新">
                    <List tab="最新" :data="list" />
                </nut-tab-pane>
                <nut-tab-pane custom-class="tab-pane" title="高佣">
                    <List tab="高佣" :data="list" />
                </nut-tab-pane>

            </nut-tabs>
        </nut-sticky>
    </view>
</template>
<route lang="json">{
    "style": {
        "navigationBarTitleText": "需求大厅"
    }
}</route>

<script setup lang="ts">
import { ref } from 'vue'
import List from './List.vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import { getTaskList } from '../../api/uav'

const active = ref(0)
// dataJson.result
const list = ref<any[]>([])

onShareAppMessage(() => {
    return {
        title: '需求大厅',
        // path: '/pages/index/index',
        imageUrl: '' // 分享卡片的图片，可选
    }
})
onMounted(() => {
    uni.showShareMenu({ withShareTicket: true })

})


const getList = async () => {
    // 排序类型 0-附近 1-最新 2.高佣
    const res = await getTaskList({ pageNum: 1, pageSize: 10, orderType: active.value })
    if (res?.code === 0) {
        list.value = res.data?.list.map(item => {
            return {
                ...item,

                money: item.price! * item.acreNum!,
                address: item.address?.length! > 11 ? `${item.address?.substring(0, 11)}..` : item.address
            }
        })
    }
}
onShow(() => {
    getList()
})


</script>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';



.booking-hall {

    // :deep(.tab-pane){
    //   padding: 16px !important;
    //   background: $bg-color;
    // }
    // :deep(.nut-tabs__list){
    //     .nut-tabs__titles-item {
    //         flex:unset;
    //     }
    // }
    :deep(.nut-tabs) {
        .nut-tabs__list {
            background: $uni-nav-bg-color;
            padding: 0 8px 16px;

            .nut-tabs__titles-item {

                flex: unset;

                .nut-icon {
                    color: $uni-tab-select-color;
                    // font-size: 18px;
                }

            }

            .nut-tabs-active {

                //   font-size: 22px;
                .nut-tabs__titles-item__smile {
                    bottom: 0;
                }
            }
        }

        .nut-tab-pane {
            padding: 0;
            background: #ffffff;
            height: 100%;
            overflow: auto;

        }
    }

    :deep(.booking-list) {
        .nut-cell__title {
            flex: unset;
        }
    }

}
</style>