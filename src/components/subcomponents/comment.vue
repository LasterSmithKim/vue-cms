<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr />
        <textarea placeholder="请输入要发表的评论内容" maxlength="120" name id rows="3" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.id" :count="count">
                <div class="cmt-title">
                    <span>第{{ count-i }}楼&nbsp; &nbsp; 用户:{{item.usename}}&nbsp; &nbsp; 发表时间:{{item.add_time}}</span>>
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
            comments: [], //所有的评论数据
            count: 0,//总楼层数
            
            msg: "" //评论输入的内容
        };
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments() {
            //获取评论
            this.$http
                .get("comment/?news=" + this.id + "&page=" + this.pageIndex + "&ordering=-id")
                .then(
                    result => {
                        if (result.body.results.length > 0) {
                            // console.log(result.body.results);
                            // this.comments = result.body.results;
                            this.count = result.body.count
                            this.comments = this.comments.concat(
                                result.body.results
                            );
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
        getMore() {
            //加载更多
            this.pageIndex++;
            this.getComments();
        },
        postComment() {
            //提交评论
            // 效验msg是否为kong
            if (this.msg.trim().length === 0) {
                return Toast("评论不能为空");
            }
            // 参数1， 请求的URL地址
            // 参数2， 提交给服务器的数据对象
            // 参数3， 定义提交时候，表单中数据的格式 { emulateJSON:true }
            this.$http
                .post("comment/", { news: this.id, content: this.msg })
                .then(
                    result => {
                        console.log(result.body);
                        this.pageIndex = 1;
                        this.comments = [];
                        this.getComments();
                    },
                    err => {
                        return Toast("评论提交失败");
                    }
                );
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