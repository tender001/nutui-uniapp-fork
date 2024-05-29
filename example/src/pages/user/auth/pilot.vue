<template>
    <view class="form-list">
        <view class="form-list-title">成为小白菜飞手</view>
        <view class="form-list-content">
            <view class="content-title">
                请完善以下证件信息
            </view>
            <view class="content-desc">已上传信息将为您保存14天，您可先上传部分证件</view>
            <view class="form-card">
                <view class="form-card-title">身份信息</view>
                
                
                <view class="form-row">
                    <view class="form-row-col">
                        <nut-uploader  @success="(row)=>handleUploadChange(row,'cardFront')" v-model:file-list="form.cardFront" :url="uploadUrl"   accept="image" 
                        multiple>
                        <image class="uploader-img" :src="`${form.cardFront[0]?.url?form.cardFront[0].url:'https://oss.6780.cn/pilot/WX20240529-092214@2x.png'}`"  />
                    </nut-uploader>
                    </view>
                    <view class="form-row-col">
                        <nut-uploader @success="(row)=>handleUploadChange(row,'cardBack')" v-model:file-list="form.cardBack" :url="uploadUrl" maximum="1" accept="image" 
                            multiple>
                            <image class="uploader-img" :src="`${form.cardBack[0]?.url?form.cardBack[0].url:'https://oss.6780.cn/pilot/WX20240529-092243@2x.png'}`"  />
                        </nut-uploader>
                    </view>

                </view>
            </view>
            <view class="form-card">
                <view class="form-card-title">执照信息</view>
                <view class="form-row">
                    <view class="form-row-col">
                        <nut-uploader @success="(row)=>handleUploadChange(row,'cardLicense')" v-model:file-list="form.cardLicense" :url="uploadUrl" maximum="1" accept="image"
                        multiple>
                        <image class="uploader-img" :src="`${form.cardLicense[0]?.url?form.cardLicense[0].url:'https://oss.6780.cn/pilot/pillot-auth.png'}`"  />
                    </nut-uploader>
                    </view>
                    <view class="form-row-col"></view>
                    
                </view>
            </view>
            <view class="form-desc">
                平台将依据法律规定以及相关约定保护你的信息安全
            </view>
        </view>

        <view class="footer-fixed-warp">
            <nut-button type="primary" size="large" @click="onSubmit">
                提交
            </nut-button>

        </view>



    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'



// ====================== Components ======================
const formRef = ref()
const form = reactive<Record<string, any>>({
    licenseType: undefined,
    licenseNo: undefined,
    code: undefined,
    password1: undefined,
    password2: undefined,
    cardFront:[],
    cardBack:[],
    cardLicense:[]
})
const switchVisible = reactive<Record<string, boolean>>({
    licenseType: false,
    agreement: false,
    ask: false
})
const uploadUrl = ref(`https://qt.59pa.com/prod-api/iou/upload`)

const handleUploadChange = (row: any,itemKey:string) => {
  const { data } = row.data
  try {
    const info = JSON.parse(data)
    const file = info.data

    
    const list =[{
        ...form[itemKey][0],
        url:file
    }]
    setTimeout(() => {
        form[itemKey] =list
    }, 100);
  } catch (error) {
    console.log('')
  }
}



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
        padding: 16px;
        .content-title {
            @include title();
            font-size: $font-size-m;
            padding-bottom: 4px;
        }
        .content-desc {
            font-size: $font-size-s;
            color: #666;
        }
        .form-card {
            border-radius: 24px;
            background: #fff;
            padding: 16px;
            margin: 16px 0;
            .form-card-title {
                @include title();
                font-size: $font-size-s;
                padding-bottom: 16px;
            }
            .form-row {
                display: flex;
                .form-row-col {
                    flex: 1;
                    width: 50%;
                    :deep(.nut-uploader__slot){
                        width: 100%;
                        border:1rpx solid #999; //$border-color;
                        border-radius: 4px;
                    }
                    .uploader-img {
                        width: 100%;
                        height: 90px;
                    }
                }
                .form-row-col + .form-row-col {
                    margin-left: 16px;
                }
            }
        }
        .form-desc {
            color: $text-color;
            font-size: $font-size-xs;
        }
    }

    


}
</style>