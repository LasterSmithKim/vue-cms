<template>
    <div>
        <h2>新闻列表页面</h2>
        <ul class="mui-table-view">

            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newslist/' + item.id">
                    <img
                        class="mui-media-object mui-pull-left"
                        :src="item.img_url"
                    />
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间：{{ item.add_time }}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
        <div style="height:100px"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newslist:[]
        };
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList() {
            //获取新闻列表
            this.$http.get("newslist/").then(result => {
                // console.log(result.body);
                // 获取数据成功，将数据保存到 data 数组中去
                this.newslist = result.body
            },err => {
                console.log(err.status);
                Toast('获取新闻列表失败')                
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
    li {
        h1 {
            font-size: 14px;
        }
        .mui-ellipsis {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>