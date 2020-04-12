<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>

        <hr />

        <!-- 缩略图 区域 -->
        <div class="thumbs">
            <vue-preview :slides="list" class="imgPrev" @close="handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item, index) in list " :src="item.image" height="100" @click="$preview.open(index, list)" :key="item.image"> -->
        </div>
        <!-- 图片内容 区域 -->

        <div class="content" v-html="photoinfo.zhaiyao"></div>
        <!-- 评论子组件 -->
        <com-box :id="id"></com-box>
        <div style="height:100px"></div>
    </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";

export default {
    data() {
        return {
            id: this.$route.params.id, //从路由中获取 图片 id
            photoinfo: {}, // 图片详情
            list: [] //缩略图的空数组
        };
    },
    created() {
        this.getPhotoInfo();
    },
    methods: {
        getPhotoInfo() {
            this.$http.get("imgslist/" + this.id).then(
                result => {
                    console.log(result.body);
                    this.photoinfo = result.body;
                    result.body.images.forEach(item => {
                        item.msrc = item.image;
                        item.src = item.image;
                        item.w = 600;
                        item.h = 400;
                    });
                    this.list = result.body.images;
                },
                err => {
                    console.log(err);
                }
            );
        },
        handleClose() {
            console.log("close event");
        }
    },
    components: {
        "com-box": comment //注册评论子组件
    }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 3px;
    h3 {
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content {
        font: size 13px;
        line-height: 30px;
    }
}
.thumbs {
    
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
}
</style>