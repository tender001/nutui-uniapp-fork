<template>
    <view class="form-list">
        <view class="form-list-title">成为滴滴飞手</view>
        <view class="form-list-content">
            <nut-form ref="formRef" :model-value="form" custom-class="nut-form-custom">

<view class="form-card">
    <view class="form-card-title">请完善以下证件信息</view>
    <!-- <nut-form-item  label="执照类型" prop="licenseType" :rules="[
{ required: true, message: '请选择执照类型' },
]"> -->
    <nut-cell title="执照类型" :desc="form.licenseType" @click="switchVisible.licenseType = true"
        is-link></nut-cell>
    <nut-popup v-model:visible="switchVisible.licenseType" position="bottom">
        <nut-picker v-model="form.licenseType" :columns="licenseTypeList" title="请选择城市"
            @cancel="switchVisible.licenseType = false" />
    </nut-popup>
    <!-- </nut-form-item> -->
    <nut-form-item body-align="right" label="执照编号" prop="licenseNo" :rules="[]"> <nut-input v-model="form.licenseNo" placeholder="请输入执照编号" input-align="right" />

    </nut-form-item>
    <nut-form-item label="上传执照" label-position="top"  prop="defaultFileList">
        <nut-uploader v-model:file-list="form.defaultFileList" url="http://服务地址" accept="image"
            maximum="1" multiple>
            <image class="uploader-img"
                src="https://oss.6780.cn/pilot/pillot-auth.png"
                mode="widthFix"
            />
        </nut-uploader>
    </nut-form-item>
</view>
<view class="form-card">
    <view class="form-card-title">能力认证</view>
    <!-- <nut-form-item  label="执照类型" prop="licenseType" :rules="[
{ required: true, message: '请选择执照类型' },
]"> -->
    <nut-cell title="常驻城市" :desc="form.city" @click="switchVisible.city = true"
        is-link></nut-cell>
    <nut-popup v-model:visible="switchVisible.city" position="bottom">
        <nut-picker v-model="form.city" :columns="licenseTypeList" title="请选择城市"
            @cancel="switchVisible.city = false" />
    </nut-popup>
    <!-- </nut-form-item> -->
    <nut-form-item body-align="right" label="工作年限" prop="limit" :rules="[]"> <nut-input v-model="form.limit" placeholder="请输入执照编号" input-align="right" />

    </nut-form-item>
    <nut-form-item label="选择能力（限选2项）" label-position="top"  prop="capacity">
        <nut-checkbox-group v-model="form.capacity">
<nut-checkbox label="1"> A </nut-checkbox>
<nut-checkbox label="2"> B </nut-checkbox>
<nut-checkbox label="3"> C </nut-checkbox>
<nut-checkbox label="4"> D </nut-checkbox>
</nut-checkbox-group>
    </nut-form-item>
</view>



</nut-form>
        </view>
        
        <view class="footer-fixed-warp">
            <nut-button type="primary" size="large" @click="onSubmit">
                提交认证
            </nut-button>

        </view>



    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import { licenseTypeList } from '@/utils/constant'


// ====================== Components ======================
const formRef = ref()
const form = reactive<Record<string, any>>({
    licenseType: undefined,
    licenseNo: undefined,
    code: undefined,
    password1: undefined,
    password2: undefined
})
const switchVisible = reactive<Record<string, boolean>>({
    licenseType: false,
    agreement: false,
    ask: false
})





const onSubmit = async () => {
    formRef.value.validate().then(async ({ valid, errors }: any) => {
        if (!valid) return
        if (!form.code) {
            uni.showToast({ title: '请输入验证码' })
            return
        }
        // console.log('onSubmit', values)
        uni.showToast({ title: '注册成功' })
    })
}


</script>
<route lang="json">{
    "style": {
        "navigationBarTitleText": "飞手认证"
    }
}</route>

<style lang="scss" scoped>
@import '@packages/styles/theme.scss';

.form-list {
    min-height: 100vh;
    .form-list-title {
    padding: 32px;
    font-size: 40rpx;
    background: $uni-nav-bg-color;
    @include title()
    }
    .form-list-content {
        border-radius: 24px;
        margin-top: -16px;
        overflow: hidden;
        background: $bg-color;
    }
    .form-card {
        padding: 16px;
        margin-bottom: 16px;
        .form-card-title {
            @include title();
            font-size: $font-size-l;
        }

        :deep(.nut-form-item) {
            padding: 8px 0 !important;
        }

        :deep(.nut-cell) {
            padding: 8px 0 !important;
        }
        .uploader-img {
            width: 40vw;
        }
    }

    // 
    :deep(.nut-cell-group__wrap) {
        border-radius: 8px;
        margin-top: 0;



        .nut-cell__title {
            @include title();
            font-size: $font-size-l;
            font-weight: 400;
        }

        .nut-icon {
            font-size: $font-size-s;
        }
    }


}
</style>