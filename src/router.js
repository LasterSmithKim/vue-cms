import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goodslist/goodslist.vue'
import GoodsInfo from './components/goodslist/GoodsInfo.vue'
import GoodsComment from './components/goodslist/GoodsComment.vue'
import GoodsDesc from './components/goodslist/GoodsDesc.vue'


var router = new VueRouter({
    routes: [ //配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList},
        { path: '/home/newslist/:id', component: NewsInfo},
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo},
        { path: '/home/goodslist', component:  GoodsList},
        { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
        { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' },
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' }

    ],
    linkActiveClass: 'mui-active'  // 覆盖 默认 路由高亮 的类，默认的叫 router-link-active 类
})


export default router