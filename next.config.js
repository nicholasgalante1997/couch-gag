// next.config.js
const withTM = require('next-transpile-modules')([
  'react-markdown',
  '@nickgdev/hellerui'
]); // pass the modules you would like to see transpiled
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});
module.exports = withTM(withMDX({ 
  env: {
    REACT_APP_ULYSSES_HASHED_KEY: '2701c0d26e510d0c7bd437e655402329f8a68b42b1a0b90ee8ede01c1108450f',
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'] 
}))
