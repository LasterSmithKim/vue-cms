<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch
                            v-model="item.select_change"
                            @change="selectedChanged(item.goods.id, item.select_change, item.nums)"
                        ></mt-switch>
                        <img :src="item.goods.img_url" alt />
                        <div class="info">
                            <h1>{{ item.goods.title }}</h1>
                            <p>
                                <span class="price">{{ item.goods.sell_price }}</span>
                                <numberbox
                                    @child-event='parentEvent'
                                    :initcount="item.nums"
                                    :goodsid="item.goods.id"
                                    :select_change="item.select_change"
                                ></numberbox>
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
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>
                            已勾选商品
                            <span class="red">{{ selectnums }}</span> 件， 总价
                            <span class="red">￥{{ selecttall }}</span>
                        </p>
                    </div>
                    <div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
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
            goodsList: [], //购物车中所有商品的数据
            data1: 1,
            selectnums: 0,
            selecttall: 0,
        };
    },
    components: {
        numberbox
    },
    created() {
        this.getshopingcar();
        this.updateTall()
    },

    methods: {
        getshopingcar() {
            axios.get("http://127.0.0.1:8000/shopingcars/").then(
                result => {
                    // console.log(result.data)
                    this.goodsList = result.data;

                },
                err => {
                    console.log(err);
                }
            );
        },
        updateTall() {
            axios.get("http://127.0.0.1:8000/shopingcars/").then(
                result => {
                    // console.log(result.data)
                    // this.goodsList = result.data;
                    // console.log(result.data)
                    var n = 0
                    var tall = 0
                    result.data.forEach(element => {
                        // console.log(element.select_change)
                        // console.log(element.nums)
                        // console.log(element.goods.sell_price)
                        if (element.select_change == true){
                            n = n + element.nums
                            tall = tall + (element.nums * element.goods.sell_price)
                        }
                    });
                    // console.log("数量" + n + "----" + "总价" + tall)
                    this.selectnums = n
                    this.selecttall = tall
                },
                err => {
                    console.log(err);
                }
            );
            // console.log("数据更新")
        },

        deletegood(goodsid, index, nums) {
            // console.log(goodsid,nums)
            axios
                .delete("http://127.0.0.1:8000/shopingcars/" + goodsid + "/")
                .then(result => {
                    // console.log(result.data)
                    // this.goodsList = result.data
                    this.goodsList.splice(index, 1);
                    this.$store.commit("addCarunms", -nums);
                    this.updateTall()
                });
        },
        selectedChanged(id, select_change, nums) {
            //每当点击开关， 把最新的 开关状态 传递到 数据库中
            // console.log(id + "---" + val)
            axios
                .patch("http://127.0.0.1:8000/shopingcars/" + id + "/", {
                    select_change: select_change,
                    nums:nums
                })
                .then(result => {
                    // console.log(result.data);
                    this.updateTall()
                });
        },
        parentEvent(data){
            this.updateTall()
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
    .jiesuan {
        display: flex; //左右
        justify-content: space-between; //两边
        align-items: center; //中间
        .red {
            color: red;
            font-weight: 900;
            font-size: 16px;
        }
    }
}
</style>