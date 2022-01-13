const path = require('path');

module.exports = {
  root: true,
  'settings': {
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, './webpack.config.js')
      }
    }
  },
  parser: "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'json': 'never',
      "jsx": 'never',
    }]
  },
  "extends": ["plugin:import/recommended"]
}