<<<<<<< HEAD
var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var env = process.env.NODE_ENV;

module.exports = {
   context: __dirname,
   mode: env,
   entry: './static/js/app.js',
   output: {
       filename: "[name]-[hash].js",
       path: path.resolve('./static/bundles/')
       // publicPath: '/'
   },

   plugins: [
       new BundleTracker({filename: './webpack-stats.json'}),
       // .vueファイルを読み込めるようにする
       new VueLoaderPlugin()
   ],

   module: {
       rules:  [
           {
               test: /\.js$/,
               loader: 'babel-loader',
           },
           {
               test: /\.vue$/,
               loader: 'vue-loader'
           },
           {
               test: /\.scss$/,
               use: [
                   'style-loader',
                   'css-loader',
                   'sass-loader'
               ]
           },
           {
               test: /\.css$/,
               use: [
                   "vue-style-loader",
                   'style-loader',
                   {
                       loader: 'css-loader',
                       options: {
                           url: false,
                           sourceMap: true
                       }
                   }
               ]
           },
       ]
   },

   resolve: {
       extensions: ['.js', '.vue'],
       modules: [
           "node_modules"
       ],
       alias: {
           'vue': path.resolve('./node_modules/vue/dist/vue.js'),
       }
   }

}
=======
const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    context: __dirname,
    entry: './static/js/index',
    output: {
        path: path.resolve('./static/bundles/'),
        filename: 'app.js'
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new VueLoaderPlugin(),
    ],

    module: {
        rules:  [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    },

};
>>>>>>> 40b68b803b32f109350a2917c9a607927080fd74
