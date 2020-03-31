var path = require('path')
//在内存中生成一份页面，同时自动打包好 bundle注入 页面底部
var htmlWebpackPlugin = require('html-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

//当以命令行形式 运行 webpack 或 webpack-dev-server 的时候，工具会发现 并没有提供 要打包的 文件 入口和出口文件
// 此时，它会检查项目根目录中的配置文件  并读取这个文件， 就难道了 配置对象 然后根据 这个对象 进行打包构建
module.exports = {
    entry: {
        index: './src/main.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: "development",
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        // 请确保引入这个插件！ vue-loader 需要
        new VueLoaderPlugin() 
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.jpg|png|gif|bmp|jpeg$/, use: 'url-loader?limit=2331555&name=[hash:8]-[name].[ext]' },   //处理图片路径的 loader
            // limit 给定的值是图片的大小 byte ，如果我们的图片大于limit 不会被转换为 base64格式字符串，如果小 转为base64字符串
            // name=[hash]-[name].[ext] 网页中大图 重命名 ： 哈希-原名.原后缀
            { test: /\.eot|svg|ttf|woff|woff2$/, use: 'url-loader' }, //处理字体的loader
            // 配置 Babel 来转化高级语法
            { test: /\.js$/, use: 'babel-loader', exclude: /(node_modules|bower_components)/ },
            { test: /\.vue$/, use: 'vue-loader' }

        ]
    },
    resolve: {
        alias: {
            // 修改 Vue 被导入时候的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    }
}