const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: './index.js',
    output : {
        filename: `${filename('js')}`,
        path: path.resolve(__dirname,'dist'),
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
      },


    plugins: [
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.pug'),
        filename: 'index.html',

    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'src/assets') , to: path.resolve(__dirname, 'dist/assets')
            }
        ]
    }),
    new MiniCssExtractPlugin({
        filename: `${filename('css')}`,
    })

],
module:{
    rules: [
        
       {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
        },

        {
            test: /\.pug$/,
                loader: 'pug-loader'
        },
      

    ]
}
};