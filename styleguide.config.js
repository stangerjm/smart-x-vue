module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  sections: [
    {
      name: 'Bit Components',
      components: 'src/components/bit-*.vue',
    },
    {
      name: 'Block Components',
      components: 'src/components/block-*.vue',
    },
    {
      name: 'Smart Components',
      components: 'src/components/smart-*.vue',
    },
    {
      name: 'Stack Components',
      components: 'src/components/stack-*.vue',
    },
  ],
  // webpackConfig: {
  //   // custom config goes here
  // },
};
