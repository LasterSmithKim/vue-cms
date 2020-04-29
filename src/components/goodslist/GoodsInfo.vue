<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品插图区 -->
        <div class="mui-card">
            <swiper :lunbotuList="lunbotu"></swiper>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价格：
                        <span class="now_price">{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>
                        购买数量：
                        <numbox :max="goodsinfo.stock_quantity" @getcount="getSelectedCount"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
                        <!-- 1. 按钮属于 goodsinfo 页面， 数字属于  numberbox 组件 -->
                        <!-- 2. 由于涉及 组件嵌套，所以无法直接拿取，需要 子组件 向父组件 传值 -->
                        <!-- 3. 事件的调用的本质：父向子传递方法，子调用这个方法，同时 把 数据 当做参数回传给这个方法 -->
                    </p>
                </div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品的名称标题</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上货时间：{{ goodsinfo.add_time }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComent(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
    <!-- 轮播图的 宽高比 都是需要自适应  -->
    <!-- 既然 多种轮播图 存在 宽度有冲突 -->
    <!-- 手动指定 宽度 是否 100% 自适应 -->
    <!-- 使用 传参数 是否 true 是否开始该类 -->
</template>


<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goods_info_numbox.vue";
import axios from "axios";
export default {
    data() {
        return {
            id: this.$route.params.id, //将路由参数中的 id 挂载到 data 中，方便后期调用
            lunbotu: [], //轮播图的数据
            goodsinfo: {}, //
            ballFlag: false, //控制小球隐藏
            selectedCount: 1 //保存用户选择的商品数量，默认1
        };
    },
    created() {
        this.getGoodsLunbotu();
    },
    methods: {
        getGoodsLunbotu() {
            this.$http.get("goodslist/" + this.id).then(
                result => {
                    // console.log(result.body.images)
                    //先循环item 修改 属性名称，因为 swiper组件中 接收 img属性，不接收 image
                    this.goodsinfo = result.body;
                    result.body.images.forEach(item => {
                        item.imgs = item.image;
                    });
                    this.lunbotu = result.body.images;
                },
                err => {
                    console.log(err);
                }
            );
        },
        goDesc(id) {
            //点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({ name: "goodsdesc", params: { id } });
        },
        goComent(id) {
            // 点击使用编程式导航跳转到 评论页面
            this.$router.push({ name: "goodscomment", params: { id } });
        },
        addToShopCar() {
            this.ballFlag = !this.ballFlag;
            // { id:商品id， count:要购买的数量， price：商品的单价， selected：false }
            // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
            // var goodsinfo = {
            //     id: this.id,
            //     count: this.selectedCount,
            //     price: this.goodsinfo.sell_price,
            //     selected: true
            // };

            // 直接把数据保存到数据中
            axios
                .post("http://127.0.0.1:8000/shopingcars/", {
                    goods: this.id,
                    nums: this.selectedCount,
                })
                .then(result => {
                    console.log(result.data);
                });

            // 调用 store 中的  mutations 的 addToCar方法 并传递 goodsinfo 对象参数
            this.$store.commit('addCarunms',this.selectedCount);
           
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
            el.offsetWidth;
            // 小球动画优化思路：
            // 1.先分析小球导致动画 不准确 的本质原因，我们把 最终 位置写死
            // 2.只要分辨率和测试不同 或 滚动条位移后 ，问题就会出现
            // 3.得到结论：不能将位移的距离写死 横纵坐标 不能写死，应该做相对动态位置
            // 4.先得到 购物车 徽标 的 横纵坐标，和小球的 横纵坐标，然后x y 值求差
            // 5.如何获取 el 的位置？ Element.getBoundingClientRect()

            // 获取小球在页面的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标页面的位置
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();
            // 计算位移
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 1s cubic-bezier(0.4, -0.3, 1.0, 0.68)";
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count) {
            // 当子组件 把 选择的 数量传递到 父组件的时候，把选中的值 保存到 data 上的selectedCount中
            this.selectedCount = count;
            console.log("父组件拿到的数量" + count);
        }
    },
    components: {
        swiper,
        numbox
    }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
    margin-bottom: 50px;
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-content-inner {
        p {
            div {
                display: inline-block;
            }
        }
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 10px 0;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute; //绝对位置
        z-index: 99; //层级
        top: 362px;
        left: 159px;
    }
}
</style>