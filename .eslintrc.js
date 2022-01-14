const path = require('path');

module.exports = {
  root: true,
  'settings': {
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, './webpack.dev.config.js')
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
    }],
    "no-console": 0,
    "eqeqeq": 2,
    "no-alert": 2
  },
  "extends": ["plugin:import/recommended"]
}