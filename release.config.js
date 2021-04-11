module.exports = {
    branches: [
        'main',
    ],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            preset: 'angular',
            releaseRules: [],
        }],
        '@semantic-release/release-notes-generator',
    ],
}