<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinf.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ newsinf.add_time }}</span>
            <span>点击次数:{{ newsinf.click }}次</span>
        </p>
        <hr />
        <div class="content" v-html="newsinf.content"></div>

        <comment-box :id="this.id"></comment-box>
        <div style="height:100px"></div>
    </div>
</template>

<script>
// 1。 导入 评论子组件
import comment from "../subcomponents/comment.vue";

export default {
    data() {
        return {
            id: this.$route.params.id, //将URL地址传递过来的 ID 值 挂载到 data 中去
            newsinf: {}
        };
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            //获取新闻详情
            this.$http.get("newslist/" + this.id).then(
                result => {
                    // console.log(result.body);
                    this.newsinf = result.body;
                },
                err => {
                    console.log(err);
                }
            );
        }
    },
    components: {
        //用来注册子组件
        "comment-box": comment
    }
};
</script>

<style lang="scss">
.newsinfo-container {
    padding: 0 4px;
    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: auto;
            height: auto;
        }
    }
}
</style>