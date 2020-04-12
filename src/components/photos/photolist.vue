<template>
    <div>
        <!-- 顶部滑动条 区域 -->
        <div
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        >
            <div class="mui-scroll">
                <a
                    :class="['mui-control-item', item.id == 1 ? 'mui-active' : '']"
                    v-for="item in cates"
                    :key="item.id"
                    @click="getPhotoListByCateId(item.id)"
                >{{ item.name }}</a>
            </div>
        </div>

        <!-- 图片列表 区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
                <img v-lazy="item.img_url" />
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>


<script>
import { Toast } from "mint-ui";
// 1. 导入 mui js的文件
import mui from "../../../lib/mui/js/mui.js";

export default {
    data() {
        return {
            cates: [],
            list: [] //图片列表的数组
        };
    },
    mounted() {
        //生命周期钩子函数   DOM结构被渲染好并放到页面中的时候 初始化 mui scroll
        // 如果要操作元素，最好在 mounted 里面 ，这个时候 dom 元素是最新的
        // 2. 初始化 滑动控件
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            scrollX: true
        });
    },
    created() {
        this.getAllCategory();
        this.getPhotoListByCateId(1); //默认进入页面，请求所有数据
    },
    methods: {
        getAllCategory() {
            //获取图片分类
            this.$http.get("imgcategory/1/").then(
                result => {
                    // console.log(result.body.sub_cat)
                    // 手动拼接 一个 全部 分类的列表

                    result.body.sub_cat.unshift({
                        id: 1,
                        add_time: "2020-04-07 13:10:59",
                        name: "全部",
                        category_type: 1,
                        parent_category: null
                    });
                    this.cates = result.body.sub_cat;
                },
                err => {
                    console.log(err.status);
                    Toast("获取图片分类列表失败");
                }
            );
        },
        getPhotoListByCateId(cateId) {
            this.$http
                .get(
                    "imgslist/" + (cateId == 1 ? "" : "?img_category=" + cateId)
                )
                .then(
                    result => {
                        this.list = result.body;
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
    }
};
</script>


<style lang="scss" scoped>
* {
    touch-action: pan-y;
}
.mui-segmented-control.mui-segmented-control-inverted
    .mui-control-item.mui-active {
    border-bottom: none;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 8px;
    padding-bottom: 0;
    li {
        margin-bottom: 10px;
        background-color: #cccccc;
        text-align: center;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}
.info {
    color: azure;
    text-align: left;
    position: absolute;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    max-height: 100px;
    .info-title {
        font-size: 14px;
    }
    .info-body {
        font-size: 13px;
    }
}
</style>