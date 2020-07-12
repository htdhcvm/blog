// const loader = require("sass-loader");
const   webpack                     = require("webpack"),
        path                        = require("path"),
        HtmlWebpackPlugin           = require("html-webpack-plugin"),
        { CleanWebpackPlugin }      = require('clean-webpack-plugin'),
        MiniCssExtractPlugin        = require("mini-css-extract-plugin"),
        CopyPlugin                  = require("copy-webpack-plugin");

module.exports = {
    entry : {
        main : "./src/js/main.js"
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
                    // path.join(process.cwd(), "/src/server")
                ]

            },
            {
                test : /\.pug$/,
                use : [
                    "pug-loader?pretty=true" // pretty=true - set pretty true for standart display html layout 
                    
                ]
            }, 
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader'
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

    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },

    plugins : [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename : "./assets/css/[name].css"
        }),
        new CopyPlugin({
            patterns : [
                { from : "./src/img", to : "../../assets/img"}
            ]
        }),
       
        // todo 
            new HtmlWebpackPlugin({
                template : "src/pug/article.pug",
                filename : "../../views/article.html",
                inject : false
            }),
            new HtmlWebpackPlugin({
                template : "src/pug/main.pug",
                filename : "../../views/main.html",
                inject : false
            }),

        // todo
      
        // new webpack.SourceMapDevToolPlugin({
        //     filename: __dirname + "/dist/[file].map"
        //   }),
    ]
}