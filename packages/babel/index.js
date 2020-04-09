module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
    },
  },
}
