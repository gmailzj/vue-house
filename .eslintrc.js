// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: "eslint:recommended",
  // ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,

  parserOptions: {
    // 代码是 ECMAScript 模块
    // sourceType: 'module',
    // 对Babel解析器的包装使其与 ESLint 兼容。
    parser: "babel-eslint"
  },
  env: {
    // 预定义的全局变量，这里是浏览器环境
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  // 扩展一个流行的风格指南
  extends: ["plugin:vue/essential", "airbnb-base"],
  // required to lint *.vue files
  plugins: ["vue"],
  // check if imports actually resolve
  settings: {
    "import/resolver": {
      webpack: {
        config: "build/webpack.base.conf.js"
      }
    }
  },
  // add your custom rules here
  rules: {
    "comma-dangle": ["off", "never"],
    "no-console": "off",
    quotes: ["off", "double"],
    indent: ["error", 2],
    "no-use-before-define": "warn",
    "object-shorthand": "off",
    "consistent-return": "off",
    "func-names": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "prefer-arrow-callback": "off",
    "prefer-const": "off",
    "no-shadow": "off",
    "prefer-template": "off",
    // don't require .vue extension when importing
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        vue: "never"
      }
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state", // for vuex state
          "acc", // for reduce accumulators
          "e" // for e.returnvalue
        ]
      }
    ],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": [
      "error",
      {
        optionalDependencies: ["test/unit/index.js"]
      }
    ],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
