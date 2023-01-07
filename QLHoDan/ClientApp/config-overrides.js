const { override, useBabelRc } = require("customize-cra");

module.exports = override(
    //do stuff with the webpack config...
    useBabelRc()
);