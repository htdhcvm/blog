// const loader = require("sass-loader");
const   webpack                     = require("webpack"),
        HtmlWebpackPlugin           = require("html-webpack-plugin"),
        { CleanWebpackPlugin }      = require('clean-webpack-plugin'),
        MiniCssExtractPlugin        = require("mini-css-extract-plugin"),
        CopyPlugin                  = require("copy-webpack-plugin");

module.exports = {
    entry : {
        mainPage : "./src/main.js",


        articlePage : "./src/article.js"
    },
    output : {
        filename : "./assets/js/[name].bundle.js",
        path: __dirname + "/public",
        publicPath : "/public"
    },
    devtool: 'cheap-module-eval-source-map',
    module : {
        rules : [
            {
                test : /\.js$/,
                use : [
                    "babel-loader"
                ],
                exclude : "/node_modules"

            },
            {
                test : /\.pug$/,
                use : [
                    "pug-loader?pretty=true" // pretty=true - set pretty true for standart display html layout 
                    
                ]
            }, 
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
            },
            {
                test : /\.scss$/,
                use : [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },

    plugins : [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename : "./assets/css/[name].css"
        }),
        new CopyPlugin({
            patterns : [
                { from : "./src/img", to : "./assets/img"}
            ]
        }),
       
        // todo 
            new HtmlWebpackPlugin({
                template : "src/pug/article.pug",
                filename : "../views/article.html",
                inject : false
            }),
            new HtmlWebpackPlugin({
                template : "src/pug/main.pug",
                filename : "../views/main.html",
                inject : false
            }),

        // todo
      
        // new webpack.SourceMapDevToolPlugin({
        //     filename: __dirname + "/dist/[file].map"
        //   }),
    ]
}