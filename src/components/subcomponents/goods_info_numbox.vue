<template>
    <div>
        <!-- 问题：不知道 什么时候能 拿到 max 值，使用 watch 属性监听 这个 父组件 传递过来的 max -->
        <!-- <div class="mui-numbox" data-numbox-min="1" :data-numbox-max='max'> -->
        <div class="mui-numbox" data-numbox-min="1">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input
                id="test"
                class="mui-input-numbox"
                type="number"
                value="1"
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
export default {
    mounted() {
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged() {
            // 每当 文本框变化是 立刻把最新的 数据 传递给 父组件
            // console.log(this.$refs.numbox.value)
            this.$emit("getcount", parseInt(this.$refs.numbox.value));
        }
    },
    props: ["max"],
    watch: {
        // 属性监听
        max: function(newVal, oldVal) {
            // 使用 JS API setOption(options)	更新选项,可取值: min(Int),step(Int),max(Int)
            mui(".mui-numbox")
                .numbox()
                .setOption("max", newVal);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>