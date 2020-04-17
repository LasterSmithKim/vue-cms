// 入口文件
import Vue from 'vue'
// 1.1 导入路由包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root = 'http://127.0.0.1:8000/'
// Vue.http.options.root = 'http://192.168.43.26:8000/'
// Vue.http.options.root = 'http://192.168.1.148:8000/'
// 设置全局 post 时候，表单数据格式的 组织形式
Vue.http.options.emulateJSON = true;

// 导入 MUI 样式
import '../lib/mui/css/mui.css'
import '../lib/mui/css/icons-extra.css'


// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 按需导入 Mint-UI 中的组件
// import { Header,Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 全部加载
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

import app from './App.vue'
var vm = new Vue({
    el:'#app',
    render: c=> c(app),
    // 1.4 挂载路由对象到vm实例
    router
})