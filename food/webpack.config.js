var webpack = require('webpack');
var path  = require('path');
var srcPath = path.join(__dirname, 'src');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');//copy文件到输出目录
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:  __dirname + "/src/js/index.js",//已多次提及的唯一入口文件
    output: {
        filename: '[hash:4]_index.js',//打包后输出文件的文件名
        path:path.resolve("./dist")//打包后的文件存放的地方
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loaders: ['raw-loader'],
                exclude:/node_modules/
            },
            { //引入css
                test: /\.css$/,
                loaders: [
                    "style-loader",
                    { loader: "css-loader", query: { modules: true } },
                     { loader: "less-loader", query: {exclude :/node_modules/}}
                ]
            },
            {//引入less
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|ttf)$/,
                loaders: ['url?limit=8192'],
                exclude:/node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff)/,
                loader: 'file?name=fonts/[hash].[ext]'
            }

        ]
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        inline: true,//实时刷新
        hot: true,//自动刷新
        port:1007
        // webpack-dev-server --port 3000(将端口号改为3000)
    },
    plugins: [
        //copy文件到输出目录
        new CopyWebpackPlugin([
            {context: path.join(srcPath,'images'),from: '**/*.*' ,to:'images'},
            {context: 'src/js/components/', from: '**/*.html' , to: 'components'},
            {context: 'src/js/libs/', from: '**/*.js' , to: 'js/libs'},
            {context: 'src/css/', from: '**/*.css' , to: 'css'},
            {context: path.join(srcPath,'fonts'),from: '**/*.*' ,to:'fonts'},
            {context: path.join(srcPath,'ueditor'),from: '**/*.*' ,to:'ueditor'}
        ]),
        new HtmlwebpackPlugin ({
            filename: "index.html",
            template: path.resolve("./src/index.html")
        }),
        new CleanWebpackPlugin(['./dist','dist/js/libs'],{
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]

}