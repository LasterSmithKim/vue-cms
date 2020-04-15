<template>
    <div class="goodsinfo-container">
        <!-- 商品插图区 -->
        <div class="mui-card">
            <swiper :lunbotuList="lunbotu"></swiper>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">页眉</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
            </div>
            <div class="mui-card-footer">页脚</div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div
                class="mui-card-header mui-card-media"
                style="height:40vw;background-image:url(../images/cbd.jpg)"
            ></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>Posted on January 18, 2016</p>
                    <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <a class="mui-card-link">Like</a>
                <a class="mui-card-link">Read more</a>
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
export default {
    data() {
        return {
            id: this.$route.params.id, //将路由参数中的 id 挂载到 data 中，方便后期调用
            lunbotu: [] //轮播图的数据
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
                    console.log(result.body.images)
                    result.body.images.forEach(item => {
                        item.imgs = item.image;
                    });
                    this.lunbotu = result.body.images
                },
                err => {
                    console.log(err);
                }
            );
        }
    },
    components: {
        swiper
    }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
}
</style>