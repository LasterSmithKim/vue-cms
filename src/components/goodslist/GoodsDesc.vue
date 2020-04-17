<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <hr />
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: []
        };
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc() {
            this.$http
                .get("goodslist/" + this.$route.params.id)
                .then(result => {
                    // console.log(result.body)
                    this.info = result.body;
                });
        }
    }
};
</script>


<style lang="scss" >
.goodsdesc-container {
    padding: 4px;
    .content {
        p {
            img {
            width: 100%;
        }
        }
    }
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    
}
</style>