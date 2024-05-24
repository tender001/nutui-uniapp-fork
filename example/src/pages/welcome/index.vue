<template>
	<view class="welcome-page" v-if="imgSrc">
		<image :src="imgSrc" mode="aspectFill"></image>
		<view class="bottom-box">
			<view>{{time}}</view>
			<view @click="gotoIndex">跳过</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc: '',
				time: 3,
				timer: null
			}
		},
		onLoad() {
			this.getImgSrc()
			this.countDown()
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},

		methods: {
			/**
			 * 模拟接口请求
			 */
			mockApi() {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve({
							code: 200,
							data: "https://img.zcool.cn/community/0110a9585f82dea8012060c88fe75c.jpg@1280w_1l_2o_100sh.jpg"
						})
					}, 200)
				})
			},

			/**
			 * 获取图片地址
			 */
			async getImgSrc() {
				try {
					const res = await this.mockApi()
					this.imgSrc = res.data
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}
			},

			/**
			 * 跳转到首页
			 */
			gotoIndex() {
				uni.reLaunch({
					url: '/pages/home/index'
				});
			},

			/**
			 * 倒计时
			 */
			countDown() {
				this.time = 5
				this.timer = setInterval(() => {
					this.time--;
					if (this.time < 1) {
						clearInterval(this.timer)
						this.time = 0
						this.gotoIndex()
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.welcome-page {
		position: relative;
		width: 100vw;
		height: 100vh;

		image {
			display: block;
			width: 100%;
			height: 100%;
		}

		.bottom-box {
			position: absolute;
			left: 0;
			bottom: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 60rpx;
			box-sizing: border-box;

			view {
				width: 120rpx;
				height: 64rpx;
				background-color: rgba(0, 0, 0, .3);
				border-radius: 999rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>