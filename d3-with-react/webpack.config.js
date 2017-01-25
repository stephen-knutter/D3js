var path = require('path');

let config = {
	devtool: 'eval-source-map',
	entry: __dirname + '/src/main.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	},
	devServer: {
		contentBase: './public',
		colors: true,
		historyApiFallback: true,
		inline: true
	}
}

if (process.env.NODE_ENV === 'production') {
	config.devtool = false;
	config.plugins = [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({comments: false}),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('production')}
		})
	];
};

module.exports = config;