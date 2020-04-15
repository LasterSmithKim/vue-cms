<template>
    <div class="goods-list">
        <!-- <router-link  class="goods-item" v-for="item in goodslist" :key="item.id" 
        :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt />
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>-->

        <!-- 在网页中有2中跳转方式 -->
        <!-- 方式1： 使用 a 标签的形式， 标签跳转 -->
        <!-- 方式2： 使用 window.location.href 的形式， 叫做 编程式导航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt />
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
        <div data-v-6866c8e2 style="height: 100px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex: 1,
            goodslist: []
        };
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            this.$http.get("goodslist/?page=" + this.pageindex).then(result => {
                // console.log(result.body.results),
                // this.goodslist = result.body.results;
                this.goodslist = this.goodslist.concat(result.body.results);
                err => {
                    console.log(err.body);
                };
            });
        },
        getMore() {
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id) {
            // 使用JS的形式进行跳转
            // 注意： 一定要区分 route 和 router 这两个对象
            // 其中: this.route 是路由参数对象 ，所有路由中的参数， parms query
            // 其中： this.router 是一个路由导航对象， 可以方便的 使用 JS 代码， 实现路由的 前进倒退跳转到新URL地址
            // this.$router.push("/home/goodsinfo/" + id)
            // this.$router.push({path: "/home/goodsinfo/" + id})
            this.$router.push({ name: "goodsinfo", params: { id: id } });
        }
    }
}; 
</script>

<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;

    justify-content: space-between;
    .goods-item {
        width: 49%;
        margin: 3px 0;
        border: 1px solid #ccc;
        box-shadow: #ccc;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 290px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background-color: #eee;
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>