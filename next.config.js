// next.config.js

// pass the modules you would like to see transpiled to cjs
const withTM = require('next-transpile-modules')([
  'react-markdown',
  '@nickgdev/hellerui'
]); 

// markdown support
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});

/**
 * @type {import('next').NextConfig}
 **/
const config = { 
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  compiler: {
    styledComponents: true
  }
}

module.exports = withTM(withMDX(config));
