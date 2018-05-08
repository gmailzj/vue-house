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
  // extends: ["airbnb-base"],
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
    "new-cap": 0,
    "vue/require-valid-default-prop": 0,
    "no-shadow-restricted-names": 0,
    "no-useless-escape": 0,
    "no-mixed-spaces-and-tabs": 0,
    "operator-assignment": 0,
    "no-sequences": 0,
    "no-unused-expressions": 0,
    "no-fallthrough": 0,
    "no-cond-assign": 0,
    "no-array-constructor": 0,
    "no-useless-concat": 0,
    "no-var": 0,
    "brace-style": "off",
    "no-redeclare": "off",
    "vars-on-top": "off",
    "no-alert": "off",
    "no-restricted-properties": "off",
    "one-var": "off",
    "default-case": "off",
    camelcase: "off",
    "max-len": "off",
    eqeqeq: "off",
    "no-undef": "off",
    radix: "off",
    "block-scoped-var": "off",
    "no-tabs": "off",
    "space-before-function-paren": "off",
    "no-plusplus": "off",
    "semi-spacing": "off",
    "no-plusplus": "off",
    "no-mixed-operators": "off",
    indent: "off",
    "global-require": "off",
    "object-curly-spacing": "off",
    "eol-last": "off",
    semi: "off",
    "key-spacing": "off",
    "arrow-spacing": "off",
    "no-unused-vars": "off",
    "comma-dangle": ["off", "never"],
    "no-console": "off",
    quotes: ["off", "double"],
    indent: ["off", 2],
    "no-use-before-define": "off",
    "object-shorthand": "off",
    "consistent-return": "off",
    "func-names": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "prefer-arrow-callback": "off",
    "prefer-const": "off",
    "no-shadow": "off",
    "prefer-template": "off",
    "import/prefer-default-export": 0,
    "import/first": "off",
    "import/no-dynamic-require": "off",
    "vue/require-v-for-key": "off",
    // don't require .vue extension when importing
    "import/extensions": [
      "off",
      "always",
      {
        js: "never",
        vue: "never"
      }
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    "no-param-reassign": [
      "off",
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
      "off",
      {
        optionalDependencies: ["test/unit/index.js"]
      }
    ],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
