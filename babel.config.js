module.exports = function (api) {
	api.cache(true);
	const presets = [
		[
			'@babel/preset-env',
			{
				modules: 'auto',
				targets: {
					browsers: ['defaults'],
				},
			},
		],
		'@babel/preset-flow',
		'@babel/preset-typescript',
	];
	return {
		presets,
	};
};
