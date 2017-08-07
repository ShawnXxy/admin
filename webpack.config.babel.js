let path = require('path');
let webpack = require('webpack');
/*
 html-webpack-plugin: generate HTML in webpack，
 https://www.npmjs.com/package/html-webpack-plugin
 */
let HtmlWebpackPlugin = require('html-webpack-plugin');
/*
 webpack plugin, to get public modules
 */
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let config = {
    // main doc(index.js) config
    entry: {
        index: path.resolve(__dirname, 'src/js/page/index.js'),
        vendors: ['vue', 'vue-router','vue-resource','vuex','element-ui','element-ui/lib/theme-default/index.css'] // 需要进行单独打包的文件
    },
    // output doc config
    output: {
        // config output path: to make src path matches path on server
        path: path.join(__dirname, 'dist'), 
        publicPath: '/dist/', 
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].asyncChunk.js?'+new Date().getTime() //configure to create chunk
    },
    module: {
        // loader
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015","stage-0"],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                // load images (similar to file-loader): convert small images to base64 so that to decrease http request
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[hash].[ext]' // convert only images size less than 8192 byte
            }
        ]
    },
    // Plugins
    plugins: [
        //webpack3.0 hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // Generate html files and import js file
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/html/index.html'), //generate path to store html
            template: path.resolve(__dirname, 'src/html/index.html'), //path for ejs template (better to include loader to pre-process)
            inject: 'body',  //position to import js file，true/'head'/'body'/false
            hash: true
        }),
        // fetch functional modules
        new CommonsChunkPlugin({
            name: 'vendors', // fetch public modules and create a chunk called vendors
            minChunks: 2, // the min number the public modules can be used (one module can be fetched as common chunks only when 2 or more pages referenced)
            // children:true  //if true, all children files will be selected and imported
        }),
    ],
    //webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "/"),
        host: 'localhost',  // could be IP address
        port: 9090, //by default
        inline: true, // moniter change of js file
        hot: true// hot start/boot
    },
    // search for path variables
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions:['.js','.scss','.vue','.json']// nto onecessary to add extentions, could use import xx from 'xx'
    }
};
module.exports = config;