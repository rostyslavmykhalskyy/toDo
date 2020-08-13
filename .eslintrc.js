module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    "css-modules"
  ],
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier", "plugin:css-modules/recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
