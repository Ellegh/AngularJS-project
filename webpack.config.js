const path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './app/app.module.js'),
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
},
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
                })
            }, {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file-loader?name=[name].[ext]&publicPath=../fonts/&outputPath=/static/fonts/'
            },
            { 
                test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=/static/img/[name].[ext]' 
            },
            {
                test: /\.(html)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.(json)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/app.css'),
        new CopyWebpackPlugin([
            {from:'static/img',to:'static/img'} 
        ])
    ],
    watch: true,
};
