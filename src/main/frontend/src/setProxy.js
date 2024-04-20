const { createProxyMiddleware } = require('http-proxy-middleware');

 module.exports = function(app) {
     app.use(
         '/home',
         createProxyMiddleware({
             target: 'http://34.64.51.56:5000',
             changeOrigin: true,
         })
     );
     app.use(
             '/class-reservation',
             createProxyMiddleware({
                 target: 'http://34.64.51.56:5000',
                 changeOrigin: true,
             })
         );
};