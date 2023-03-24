module.exports = function devSwitch(app) {
  if (process.env.REACT_APP_DEV_ENV === true) {
    const { createProxyMiddleware } = require("http-proxy-middleware");
    app.use(createProxyMiddleware("/io", { target: "http://localhost:8080/" }));
  }
};