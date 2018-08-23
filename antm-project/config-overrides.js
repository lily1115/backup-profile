
const path = require('path')
const { injectBabelPlugin, getLoader } = require('react-app-rewired')
// const theme = require('./src/theme')

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) !== -1
}

console.log('💩 Rewrite \'create-react-app\' config ⚡')

module.exports = function override (config, env) {
  // babel-plugin-import
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    style: true // use less for customized theme
  }], config)

  // customize theme
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('autoprefixer')({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9' // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009'
              })
            ]
          }
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            // theme vars, also can use theme.js instead of this.
            // modifyVars: theme
          }
        }
      ]
    }
  )

  // css-modules
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.css$/,
      exclude: /node_modules|antd-mobile\.css/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('autoprefixer')({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9' // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009'
              })
            ]
          }
        }
      ]
    }
  )

  // file-loader exclude
  let l = getLoader(config.module.rules, fileLoaderMatcher)
  l.exclude.push(/\.less$/)

  config.resolve = {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      images: path.resolve(__dirname, './src/assets/images/'),
      less: path.resolve(__dirname, './src/less/'),
      components: path.resolve(__dirname, './src/js/components/'),
      utils: path.resolve(__dirname, './src/js/utils/'),
      ui: path.resolve(__dirname, './src/js/ui/'),
      data: path.resolve(__dirname, './data/'),
    },
  }

  return config
}
