module.exports = {
  schema: ['.redwood/schema.graphql'],
  documents: '**/*.{graphql,js,ts,jsx,tsx}',
  extensions: {
    endpoints: {
      default: {
        url: 'http://localhost:8910',
      },
    },
  },
}
