const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  baseUrl: '/',
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: '../report/report.html',
      }),
    ],
  },
};
