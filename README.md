# 这个是一个 vue 项目

## 牛不牛逼 ，用心去感受 ，每一行代码 的 诗情雅意

### 我们是有灵魂的程序员 ，所以 我们


## 开源协议：MIT

## 用传统的方式 把 修改的代码上传到github
1. git add .
2. git commit -m "这个提交信息"
3. git push   

## 制作首页App组件

1. 完成  Header 区域， 使用的 是 Mint-UI 中的 Header组件
2. 制作底部的 Tabbar 区域 ，使用的是 Tabbar.html
 + 在制作 购物车小图标的时候，操作会相对多一写
 + 先把 扩展图标 css 样式，拷贝到项目中
 + 拷贝 扩展字体库 tff 文件 到项目中
 + 为购物车 小图标 ，添加 mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在 中间区域放置一个 router-view 来展示路由匹配到组件


## 改造 tabbar 为 router-link

## 设置 路由 高亮

## 点击 tabbar 中的路由链接， 展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 如何获取，使用 vue-resource   ~ npm install vue-resource -S
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取的数据 放置 data 的数组中
4. 使用 v-for 循环渲染 每个 item 项

## 改造九宫格的 区域样式


## 改造 新闻资讯 的连接

## 新闻资讯 页面制作 
1. 绘制页面 使用 MUI 中的 media list 组件
2. 使用 vue-resource 获取数据
3. 渲染真实数据


## 实现新闻资讯列表 点击跳转到 新闻详情页
1. 把列表每一项改造成 router-link ，同时 在跳转的时候提供唯一ID标识符
2. 创建新闻详情页的组件页面， NewInfo.vue
3. 在路由模块中， 将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的页面设计 

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中， 先手动导入 comment 组件
    + 'import comment from './comment.vue''
3. 在父组件中使用  ‘components’ 属性，将 刚才导入的 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的， 注册名，以 标签形式 在页面中 引用即可

## 获取所有的评论数据， 显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件 在事件中 请求 下一页的数据
2. 点击加载更多 ，让 pageIndex++ ，然后重新调用 this.getComments() 方法重新获取新数据
3. 为了防止新数据覆盖老数据，我们在 点击加载新数据时， 调用老数据的concat方法，进行拼接
