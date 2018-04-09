"use strict";

const Handlebars = require('handlebars'),
    stringify = require('stringify');

// NOTE: For using require to import text file should need stringify

stringify.registerWithRequire({
    extensions: ['.txt', '.html'],
    minify: true,
    minifyAppliesTo: {
        includeExtensions: ['.html']
    },
    minifyOptions: {
        // html-minifier options
    }
});

const showMainPage = function (req, res) {
    let strVar = require("./index.html");
    const template = Handlebars.compile(strVar);
    const result = template();
    res.status(200).send(result);
};

module.exports = {
    'showMainPage': showMainPage
};