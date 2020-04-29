<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img :src="item.goods.img_url" alt />
                        <div class="info">
                            <h1>{{ item.goods.title }}</h1>
                            <p>
                                <span class="price">{{ item.goods.sell_price }}</span>
                                <numberbox :initcount="item.nums" :goodsid="item.goods.id"></numberbox>
                                <a
                                    href="#"
                                    @click.prevent="deletegood(item.goods.id,i,item.nums)"
                                >删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div
                    class="mui-card-content-inner"
                >这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
            </div>
        </div>
    </div>
</template>


<script>
import cookie from "../../js/cookie.js";
import axios from "axios";
import numberbox from "../subcomponents/shopcar_numbox.vue";
export default {
    data() {
        return {
            goodsList: [] //购物车中所有商品的数据
        };
    },
    components: {
        numberbox
    },
    created() {
        this.getshopingcar();
    },
    methods: {
        getshopingcar() {
            axios.get("http://127.0.0.1:8000/shopingcars/").then(result => {
                // console.log(result.data)
                (this.goodsList = result.data),
                    err => {
                        console.log(err);
                    };
            });
        },
        deletegood(goodsid, index, nums) {
            // console.log(goodsid,nums)
            axios
                .delete("http://127.0.0.1:8000/shopingcars/" + goodsid + "/")
                .then(result => {
                    // console.log(result.data)
                    // this.goodsList = result.data
                    this.goodsList.splice(index,1)
                    this.$store.commit("addCarunms", -nums);
                });
        }
    }
};
</script>


<style lang="scss" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;

    .goods-list {
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }
        img {
            width: 60px;
            height: 60px;
        }
        h1 {
            font-size: 13px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                display: flex;
            }
            .price {
                color: red;
                font-weight: bold;
            }
        }
    }
}
</style>