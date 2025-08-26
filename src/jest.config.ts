const config = {
	clearMocks: true,
	transform: {
		'^.+\\.jsx|js$': 'babel-jest',
	},
	testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx|js|tsx|ts)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testEnvironment: 'jest-environment-jsdom',
};

export default config;
