// Karma + Jasmine para componentes React (webpack + babel compila el JSX).
// npm test            -> Chrome sin interfaz (requiere Chrome instalado)
// npm run test:jsdom  -> sin navegador (jsdom), útil en CI o si no hay Chrome
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],
    plugins: ["karma-jasmine", "karma-webpack", "karma-chrome-launcher", "karma-jsdom-launcher", "karma-spec-reporter", "karma-coverage"],
    files: [{ pattern: "test/**/*.spec.jsx", watched: false }],
    preprocessors: { "test/**/*.spec.jsx": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: false,
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
                plugins: process.env.COVERAGE === "1" ? ["istanbul"] : [],
              },
            },
          },
        ],
      },
    },
    reporters: process.env.COVERAGE === "1" ? ["spec", "coverage"] : ["spec"],
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "html" }, { type: "text-summary" }, { type: "lcovonly", subdir: ".", file: "lcov.info" }],
      includeAllSources: true,
    },
    browsers: ["ChromeHeadlessSinSandbox"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: "ChromeHeadless", flags: ["--no-sandbox"] },
    },
    singleRun: true,
  });
};
