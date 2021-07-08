const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://wifi.kinami.cc", //请求的真实地址
      target: "http://localhost:8844/", //请求的真实地址
      changeOrigin: true,
    })
  );
};
