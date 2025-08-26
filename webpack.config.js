const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		main: './src/index.ts',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'src/assets',
					to: 'assets',
				},
				{
					from: 'src/views/index.html',
					to: '',
				},
			],
		}),
	],
};
