const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://pasinduperera-001-site1.atempurl.com',
    changeOrigin: true,
  }));
};