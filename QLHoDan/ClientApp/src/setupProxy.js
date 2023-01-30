const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

// const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
//   env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:4698';
const target = 'https://localhost:7265';

const context = [
  "/api",
  "/weatherforecast",
  "/_configuration",
  "/.well-known",
  "/Identity",
  "/connect",
  "/ApplyDatabaseMigrations",
  "/_framework"
];

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    // Handle errors to prevent the proxy middleware from crashing when
    // the ASP NET Core webserver is unavailable
    onError: onError,
    changeOrigin: true,
    logger: console,
    secure:false,
    headers: undefined,
    // Uncomment this line to add support for proxying websockets
    //ws: true, 
  });

  app.use(appProxy);
};
