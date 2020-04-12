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


## 发表评论
1. 把文本框做双向绑定
2. 为发表按钮按钮绑定一个事件
3. 效验评论是否为空
4. 通过vue-resource 发送一个请求，把评论发送给服务器
5. 重新刷新列表， 以查看最新评论


## 改造图片分析 按钮为 路由连接 并 显示对应的组件页面
## 绘制 图片列表 组件页面结构 并 美化样式
1. 制作  顶部的滑动条
2. 制作  底部的图片列表
### 制作顶部滑动条的坑：
1. 需要借助于  MUI 中的 tab-top-webview-main.html 
2. 需要 slider 区域中的 mui-fullscreen 类 去除
3. 滑动条无法正常触发滑动，通过检查官方文档，这是一个sj组件需要被初始化
 + 1. 导入 mui.js
 + 2. 调用官方提供的方式：
 '''
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
 '''
 4. 我们在初始化 滑动条 的时候 ，导入了 mui.js 但是 控制台报错：Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
 + 经过退出 ，可能是 mui.js 中使用了 caller callee arguments， 但是在 webpack 打包好的 bundle.js 中是默认启用 strict mode 的，所以冲突了，
 + 解决方案： 1 把mui.js中的非严格模式的代码改掉； 方案2 . webpack 打包时候的 严格模式禁用
 + 使用第二种方案： "babel-plugin-transform-remove-strict-mode": "0.0.2" 
                .babelrc 中， plugins: "transform-remove-strict-mode"
 5. 刚进去图片分享页面的时候， 滑动条 无法正常工作 ，经过分析，发现如果要 初始化 滑动条，必须要等dom元素加载完毕，所以我们把 初始化 滑动条 的代码，放进 mounted 生命周期函数中
 6. 当 滑动条 调试完成以后，发现 tabbar 无法正常工作，这个时候 需要把每个 tabbar 按钮的样式 mui-tab-item 重新 该一下名字 mui-tab-item-sm，并 将涉及到 mui-tab-item 的 样式全部自定义 给 mui-tab-item-sm
 7. 获取所有分类，并渲染 所有分类

### 制作图片列表区域
 1. 图片需要使用懒加载技术，我们可以使用 Mint-UI 提供现成的组件 ’lazy-load‘
 2. 渲染图片列表数据

 ### 实现了 图片列表的 懒加载改造 和 样式美化

 ## 实现点击图片跳转到 图片详情页面
 1. 在改造 li 成 router-link 的时候，使用 tag 标签，指定渲染为 哪种元素

 ## 实现 图片详情页面的 布局 和 美化，同时 获取数据 渲染页面
 1. npm i vue-preview -S
 2. <div class="thumbs">
            <vue-preview :slides="list" class="imgPrev" @close="handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item, index) in list " :src="item.image" height="100" @click="$preview.open(index, list)" :key="item.image"> -->
        </div>
 3. 绑定 list 数据
 4. .thumbs {
    
    /deep/ .my-gallery {
        display: flex;
        flex-wrap: wrap;
        figure {
            width: 30%;
            margin: 2px;
            img {
                width: 100%;
                height: 100px;
            }
        }
    }
    引用特定样式
## 

