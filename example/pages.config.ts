import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
export const tabBars = []
export default defineUniPages({
  // You can also define pages fields, which have the highest priority.
  // easycom: {
  //   autoscan: true,
  //   custom: {
  //     '^nut-(.*)?-(.*)': 'uniapp-nutui/components/$1$2/$1$2.vue',
  //     '^nut-(.*)': 'uniapp-nutui/components/$1/$1.vue',
  //   },
  // },
  "tabBar": {
    "color": "#666666",
    "selectedColor": "#8b7773",
    "backgroundColor": "#fcfcfc",
    "height": "50px",
    "fontSize": "10px",
    "iconWidth": "20px",
    "spacing": "4px",
    "list": [
      {
        "iconPath": "static/tabbar/home.png",
        "selectedIconPath": "static/tabbar/homeHL.png",
        "pagePath": "pages/home/index",
        "text": "首页"
      },
      {
        "iconPath": "static/tabbar/release.png",
        "selectedIconPath": "static/tabbar/releaseHL.png",
        "pagePath": "pages/bookingHall/index",
        "text": "需求"
      },
      {
        "iconPath": "static/tabbar/order.png",
        "selectedIconPath": "static/tabbar/orderHL.png",
        "pagePath": "pages/order/index",
        "text": "订单"
      },
      {
        "iconPath": "static/tabbar/personal.png",
        "selectedIconPath": "static/tabbar/personalHL.png",
        "pagePath": "pages/my/index",
        "text": "我的"
      }
    ]
  },
  pages: [
    {
      path: 'pages/home/index',
      type: 'home',
    },
  ],
  // subPackages:[{
  //   root: 'pages/user',
  //   pages: [{ path: 'pages/user/setting/index',
  //   type: 'page'}],
  // }],
  globalStyle: {
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: '遇见语录',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    // navigationStyle: isH5 ? 'custom' : 'default',
  },
})
