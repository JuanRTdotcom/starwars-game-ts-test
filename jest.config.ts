const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.(ts|js)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
};

export default config;