export const ENGINES = {
  google: {
    name: "Google",
    url: "https://www.google.com",
    query: "https://www.google.com/search?q=",
    logo: {
      src: "/images/engines/google.png",
      width: 272,
      height: 92,
    },
    submit: "Google Search",
    inputClassNames: "",
    submitClassNames: "",
  },
  bing: {
    name: "Bing",
    url: "https://www.bing.com",
    query: "https://www.bing.com/search?q=",
    logo: {
      src: "/images/engines/bing.png",
      width: 270,
      height: 129,
    },
    submit: "Search",
    inputClassNames: "",
    submitClassNames: "",
  },
  baidu: {
    name: "百度",
    url: "https://www.baidu.com",
    query: "https://www.baidu.com/s?wd=",
    logo: {
      src: "/images/engines/baidu.png",
      width: 270,
      height: 129,
    },
    submit: "百度一下",
    inputClassNames: "",
    submitClassNames: "",
  },
  yandex: {
    name: "Yandex",
    url: "https://yandex.com",
    query: "https://yandex.com/search/?text=",
    logo: {
      src: "/images/engines/yandex.png",
      width: 270,
      height: 129,
    },
    submit: "Search",
    inputClassNames: "",
    submitClassNames: "",
  },
} as const;
