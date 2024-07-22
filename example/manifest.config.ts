import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'name': '青创农服',
  'appid': '__UNI__D989E4B',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'mp-weixin': {
    appid: 'wx1db789abdecc9a60',
    setting: {
      urlCheck: false,
      es6: true,
      minified: true,
      postcss: true,

    },
    libVersion: '3.0.0',
    usingComponents: true,
    lazyCodeLoading: 'requiredComponents',
    darkmode: true,
    themeLocation: 'theme.json',
    // mergeVirtualHostAttributes: true,
  },
  'mp-alipay': {
    appid: 'wx1db789abdecc9a60',
    setting: {
      urlCheck: false,
      es6: true,
      minified: true,
      postcss: true,
    },
    usingComponents: true,
    lazyCodeLoading: 'requiredComponents',
    darkmode: true,
    themeLocation: 'theme.json',
  },
  'uniStatistics': {
    enable: false,
  },
  'h5': {
    darkmode: true,
    themeLocation: 'theme.json',
  },
  'vueVersion': '3',
  'app-plus': {
    darkmode: true,
    themeLocation: 'theme.json',
    distribute: {
      ios: {
        dSYMs: false,
      },
      sdkConfigs: {
        ad: {},
      },
    },
  },
})
