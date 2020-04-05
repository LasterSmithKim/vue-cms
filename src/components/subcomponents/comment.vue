<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr />
        <textarea placeholder="请输入要发表的评论内容" maxlength="120" name id rows="3"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.id">
                <div class="cmt-title">
                    <span>第{{i+1}}楼&nbsp; &nbsp; 用户:{{item.usename}}&nbsp; &nbsp; 发表时间:{{item.add_time}}</span>>
                </div>
                <div class="cmt-body">
                    <span>{{item.content}}</span>
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            pageIndex: 1, //默认展示第一页数据
            comments: [] //所有的评论数据
        };
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments() {  //获取评论
            this.$http
                .get("comment/?news=" + this.id + "&page=" + this.pageIndex)
                .then(
                    result => {
                        if (result.body.results.length > 0) {
                            // console.log(result.body.results);
                            // this.comments = result.body.results;
                            this.comments = this.comments.concat(result.body.results)
                        } else {
                            Toast("获取评论失败，或没有新评论！");
                        }
                    },
                    err => {
                        console.log(err);
                        Toast("获取评论失败，或没有新评论！");
                    }
                );
        },
        getMore(){  //加载更多
            this.pageIndex++;
            this.getComments();
        }
    },
    props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin: 10px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>