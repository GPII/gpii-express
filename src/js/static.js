// Module to serve static content using the express static middleware
"use strict";
var fluid        = fluid || require("infusion");
var gpii         = fluid.registerNamespace("gpii");
fluid.registerNamespace("gpii.express.router.static");

var express = require("express");

// The library is actually named "static", so for clarity I want to use that name in spite of the warnings in older versions of JSHint
/* jshint -W024 */
gpii.express.router.static.getHandler = function (that) {
    if (!that.options.path) {
        fluid.fail("You must configure a path for a gpii.express.router grade...");
        return null;
    }

    if (!that.options.content) {
        fluid.fail("You must configure a content value to indicate what static content is to be served.");
        return;
    }

    return express.static(that.options.content);
};

fluid.defaults("gpii.express.router.static", {
    gradeNames: ["fluid.modelComponent", "gpii.express.router"],
    content: null,
    router:  null,
    invokers: {
        "getHandler": {
            funcName: "gpii.express.router.static.getHandler",
            args: ["{that}"]
        }
    }
});