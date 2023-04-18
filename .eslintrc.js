module.exports = {
  extends: ["next", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-curly-brace-presence": [
      1,
      {
        props: "always",
        children: "ignore",
      },
    ],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: true,
        shorthandLast: true,
      },
    ],
  },
};
