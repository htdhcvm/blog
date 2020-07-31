// const loader = require("sass-loader");
const   webpack                     = require("webpack"),
        path                        = require("path"),
        HtmlWebpackPlugin           = require("html-webpack-plugin"),
        { CleanWebpackPlugin }      = require('clean-webpack-plugin'),
        MiniCssExtractPlugin        = require("mini-css-extract-plugin"),
        CopyPlugin                  = require("copy-webpack-plugin");

module.exports = {
    entry : {
        main : "./src/js/main.js",
        signin : "./src/js/signin.js",
        signup : "./src/js/signup.js",
        post : "./src/js/post.js",
        writePost : "./src/js/write-post.js",
        admin : "./src/js/admin.js",
        adminCategory : "./src/js/adminCategory.js",
        settings : "./src/js/settings.js",
        userPage : "./src/js/userPage.js",
        adminPost : "./src/js/adminPost.js"
    },
    output : {
        filename : "./assets/js/[name].js",
        path: path.join(process.cwd(), "/public"),
        publicPath : "/public"
    },
    target: "web",
    module : {
        rules : [
            {
                test : /\.js$/,
                use : [
                    "babel-loader"
                ],
                exclude : [
                    "/node_modules"
                ]

            }, 
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name : "[name].[ext]",
                    outputPath: "assets/img",
                }
            },
            {
                test: /\.(ttf|woff|eot)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/font'
                    }
                  }
                ]
            },
            {
                test : /\.scss$/,
                use : [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
       


        ]
    },

    plugins : [
        new MiniCssExtractPlugin({
            filename : "./assets/css/[name].css"
        })
      
    ]
}