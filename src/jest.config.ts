import type { Config } from 'jest';

const config: Config = {
	clearMocks: true,
	transform: {
		'^.+\\.jsx|js$': 'babel-jest',
	},
	testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx|js|tsx|ts)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
