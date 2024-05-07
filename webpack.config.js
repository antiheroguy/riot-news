import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config()

export default {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.resolve('dist'),
		filename: '[name].bundle.js',
		clean: true,
	},
	externals: {
		url: 'url',
	},
	devtool: 'source-map',
	optimization: {
		runtimeChunk: {
			name: 'runtime',
		},
		splitChunks: {
			chunks: 'async',
			minSize: 20000,
			minRemainingSize: 0,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	devServer: {
		hot: true,
		open: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.riot$/,
				exclude: /node_modules/,
				use: [
					{
						loader: '@riotjs/webpack-loader',
						options: {
							hot: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			favicon: 'src/favicon.ico',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env),
		}),
	],
}
