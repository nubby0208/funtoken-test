// jest.config.js
module.exports = {
    "moduleNameMapper": {
        "axios": "axios/dist/node/axios.cjs"
      },
    // Add other necessary Jest configurations
    transform: {
        '^.+\\.js$': 'babel-jest',
      },
      "type": "module",
      "testEnvironment": "node",
  };