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
// http拦截器
// http request 拦截器
import axios from 'axios';
import cookie from "./js/cookie.js";
axios.interceptors.request.use(

    config => {
        if (cookie.getCookie("token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `JWT ${cookie.getCookie("token")}`;
        }
        // console.log(cookie.getCookie("token"))
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刷新或者刚进入网站，都去本地捞一下数据 car
// var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {
        carnums : "",
    },
    mutations: {
        addToCar(state, goodsinfo) {

            // car = goodsinfo
            // 点击加入购物车，将商品信息， 保存到 store 中的 car 中
            // 分析：
            // 1.如果购物车中，之前已经有这个对应的商品，只需要更新数量
            // 2.如果没有，直接把商品数据 push 到car 中即可

            // 假设 在购物车中，没有找到对应的商品
            // var flag = false

            // state.car.some(item => {
            //     if (item.id == goodsinfo.id) {
            //         item.count += parseInt(goodsinfo.count)
            //         flag = true
            //         return true
            //     }
            // })

            // 如果循环完毕，还是 false ，直接push goodsinfo 到 car 中
            // if (!flag) {
            //     state.car.push(goodsinfo)
            // }

            // 当 更新 car 之后，把 car 数组，存储到本地 localStorage 中去
            // localStorage.setItem('car', window.JSON.stringify(state.car))
        },
        saveCarunms(state,carsnums){
            state.carnums = carsnums
        },
        addCarunms(state,nums){
            state.carnums += parseInt(nums)
        },
       
    },
    getters: {  // this.$store.getters.***
        // 相当于 计算属性 也相当于 过滤器 filters
        getAllCount(state) {
            // var c = 0
            // state.car.forEach(item => {
            //     c += item.count
            // })
            // return c
        }
    },
})

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
    el: '#app',
    render: c => c(app),
    // 1.4 挂载路由对象到vm实例
    router,
    store,
    data: {
        car: []
    },
    created() {
        this.getshopcar()
    },
    methods: {
        getshopcar() {
            axios.get("http://127.0.0.1:8000/shopingcars/").then(
                result => {
                    var c = 0
                    result.data.forEach(item =>{
                        c += item.nums
                    })
                    // console.log(c)
                    this.$store.commit('saveCarunms',c);
                    // this.$store.commit("addToCar", result.data);
                    // localStorage.setItem('car', window.JSON.stringify(result.data))
                }
            )
        }
    },
})