<template>
    <div>
        <!-- 问题：不知道 什么时候能 拿到 max 值，使用 watch 属性监听 这个 父组件 传递过来的 max -->
        <!-- <div class="mui-numbox" data-numbox-min="1" :data-numbox-max='max'> -->
        <div class="mui-numbox" data-numbox-min="1" style="height:25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input
                id="test"
                class="mui-input-numbox"
                type="number"
                :value="initcount"
                @change="countChanged"
                ref="numbox"
            />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
    <!-- 分析： 子组件什么时候把 数据传递给 父组件 -->
</template>


<script>
import mui from "../../../lib/mui/js/mui.js";
import axios from "axios";
export default {
    mounted() {
        mui(".mui-numbox").numbox();
        // console.log(this.goodsid)
    },
    data() {
        return {
            c: this.initcount
        };
    },
    methods: {
        countChanged() {
            // 每当 文本框变化是 立刻把最新的 数据 传递给 父组件
            // console.log(this.$refs.numbox.value)
            // this.$emit("getcount", parseInt(this.$refs.numbox.value));
            // console.log(this)
            // console.log(this.$refs.numbox.value)
            
            axios
                .patch(
                    "http://127.0.0.1:8000/shopingcars/" + this.goodsid + "/",
                    { nums: this.$refs.numbox.value, select_change:this.select_change }
                )
                .then(result => {
                    // this.$store.commit('addCarunms',(result.data.nums - c));
                    // console.log(result.data)
                    this.$store.commit('addCarunms',(result.data.nums - this.c));
                    this.c = result.data.nums;

                    this.$emit('child-event','子组件发生数据变化')


                    // console.log(this.c)
                    // this.$emit('child-event',this.c)
                });
        }
    },
    props: ["initcount", "goodsid", "select_change"]
    // watch: {
    //     // 属性监听
    //     value: function(newVal, oldVal) {
    //         // 使用 JS API setOption(options)	更新选项,可取值: min(Int),step(Int),max(Int)
    //         console.log(newVal , newVal)
    //     }
    // }
};
</script>


<style lang="scss" scoped>
</style>