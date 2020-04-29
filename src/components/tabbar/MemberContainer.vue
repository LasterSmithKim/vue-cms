<template>
    <div>
        <div class="mui-content">
            <form id="login-form" class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input
                        v-model="username"
                        @focus="errorUnshow"
                        id="account"
                        type="text"
                        class="mui-input-clear mui-input"
                        placeholder="请输入账号"
                        data-input-clear="2"
                    />
                    <span class="mui-icon mui-icon-clear mui-hidden"></span>
                </div>
                <p class="error-text" v-show="userNameError">{{userNameError}}</p>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input
                        v-model="password"
                        @focus="errorUnshow"
                        id="password"
                        type="password"
                        class="mui-input-clear mui-input"
                        placeholder="请输入密码"
                        data-input-clear="3"
                    />
                    <span class="mui-icon mui-icon-clear mui-hidden"></span>
                </div>
                <p class="error-text" v-show="parseWordError">{{parseWordError}}</p>
            </form>

            <div class="mui-content-padded">
                <button
                    id="login"
                    type="button"
                    class="mui-btn mui-btn-block mui-btn-primary"
                    @click="login"
                >登录</button>
                <div class="link-area">
                    <a id="reg">注册账号</a>
                    <span class="spliter">|</span>
                    <a id="forgetPassword">忘记密码</a>
                </div>
            </div>
            <div class="mui-content-padded oauth-area"></div>
        </div>
        <button @click="getshopingcar">获取购物车数据</button>
    </div>
</template>


<script>
import cookie from "../../js/cookie.js";
import axios from 'axios';

// http拦截器
// http request 拦截器cookie.getCookie("token")

export default {
    data() {
        return {
            username: "",
            password: "",
            autoLogin: false,
            error: false,
            errorinfo:"",
            userNameError: "",
            parseWordError: ""
        };
    },
    methods: {
        login() {
            console.log("用户名：" + this.username);
            console.log("密码：" + this.password);
            this.$http
                .post("api-token-auth/", {
                    username: this.username,
                    password: this.password
                })
                .then(
                    result => {
                        console.log(result.body);
                        //本地存储用户信息
                        cookie.setCookie("name", this.username, 7);
                        cookie.setCookie("token", result.data.token, 7);
                    },
                    err => {
                        console.log(err.body);

                        if ("non_field_errors" in err.body) {
                            console.log(err.body.non_field_errors[0]);
                            this.errorinfo = err.body.non_field_errors[0];
                        }
                        if ("username" in err.body) {
                            console.log(err.body.username[0]);
                            this.userNameError = err.body.username[0];
                        }
                        if ("password" in err.body) {
                            console.log(err.body.password[0]);
                            this.parseWordError = err.body.password[0];
                        }

                        //清除缓存
                        cookie.delCookie("token");
                        cookie.delCookie("name");
                    }
                );
        },
        getshopingcar(){
            axios.get("http://127.0.0.1:8000/shopingcars/").then(result => {
                console.log(result.data),
                err => {
                    console.log(err)
                }
            })
        },
        errorUnshow() {
            this.error = false;
        }
    }
};
</script>


<style lang="scss" scoped>
.error-text {
    color: #fa8341;
    
}
.mui-input-group:first-child {
    margin-top: 20px;
}
.mui-input-group {
    position: relative;
    padding: 0;
    border: 0;
    background-color: #fff;
}
.mui-content-padded {
    margin-top: 25px;
}
.mui-btn {
    padding-bottom: 10px;
    padding-top: 10px;
}
.link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
}
</style>