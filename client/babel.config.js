module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: '3',
        targets: {
          ie: 11,
          firefox: 30,
          chrome: 55
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development',
      },
    ],
  ],
};
