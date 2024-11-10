module.exports = {
  extends: ["airbnb", "prettier"],
  env: {
    jest: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error",
    "eslint no-param-reassign": ["error", { props: false }]
  },
  plugins: ["prettier",
    process.env.NODE_ENV === 'development' && new ReactRefreshWebpackPlugin().filter(Boolean),
  ]
};
