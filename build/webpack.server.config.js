// const loader = require("sass-loader");
const   webpack                     = require("webpack"),
        path                        = require("path"),
        { CleanWebpackPlugin }      = require('clean-webpack-plugin'),
        nodeExternals               = require("webpack-node-externals");

module.exports = {
    entry : {
        app : "./src/server/app.js"
    },
    output : {
        filename : "[name].js",
        path: path.join(process.cwd(), "/public"),
        publicPath : "/public"
    },
    target: 'node',
    node: {
       
        __dirname: false,  
        __filename: false,  
      },
    externals: [nodeExternals()],
    module : {
        rules : [
            {
                test : /\.js$/,
                use : [
                    "babel-loader"
                ],
                exclude : "/node_modules"

            }
        ]
    },
    plugins : [
        new CleanWebpackPlugin()
    ]
}