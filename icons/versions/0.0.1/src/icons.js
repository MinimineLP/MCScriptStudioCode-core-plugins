"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Plugin = require(srclocation + '/PluginManager').Plugin;
var Explorer = /** @class */ (function (_super) {
    __extends(Explorer, _super);
    function Explorer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Explorer.prototype.setup = function (server) {
        this.server = server;
        server.addFile(__dirname + "/htdocs/fonts/MaterialIcons-Regular.eot", "/fonts/MaterialIcons-Regular.eot");
        server.addFile(__dirname + "/htdocs/fonts/MaterialIcons-Regular.ttf", "/fonts/MaterialIcons-Regular.ttf");
        server.addFile(__dirname + "/htdocs/fonts/MaterialIcons-Regular.woff", "/fonts/MaterialIcons-Regular.woff");
        server.addFile(__dirname + "/htdocs/fonts/MaterialIcons-Regular.woff2", "/fonts/MaterialIcons-Regular.woff2");
        server.addFile(__dirname + "/htdocs/@mdi/font/fonts/materialdesignicons-webfont.eot", "/fonts/materialdesignicons-webfont.eot");
        server.addFile(__dirname + "/htdocs/@mdi/font/fonts/materialdesignicons-webfont.eot", "/fonts/materialdesignicons-webfont.eot");
        server.addFile(__dirname + "/htdocs/@mdi/font/fonts/materialdesignicons-webfont.woff2", "/fonts/materialdesignicons-webfont.woff2");
        server.addFile(__dirname + "/htdocs/@mdi/font/fonts/materialdesignicons-webfont.woff", "/fonts/materialdesignicons-webfont.woff");
        server.addFile(__dirname + "/htdocs/@mdi/font/fonts/materialdesignicons-webfont.ttf", "/fonts/materialdesignicons-webfont.ttf");
        server.addFile(__dirname + "/htdocs/@mdi/font/fonts/materialdesignicons-webfont.svg", "/fonts/materialdesignicons-webfont.svg");
        server.addFile(__dirname + "/htdocs/@mdi/font/css/materialdesignicons.css", "/materialdesignicons.css");
        server.addFile(__dirname + "/htdocs/@mdi/font/css/materialdesignicons.css.map", "/materialdesignicons.css.map");
        server.addFile(__dirname + "/htdocs/@mdi/font/css/materialdesignicons.min.css.map", "/materialdesignicons.min.css.map");
        server.addStylesheet(__dirname + "/htdocs/@mdi/font/css/materialdesignicons.min.css");
        server.addStylesheet(__dirname + "/htdocs/css/material-icons.min.css");
    };
    Explorer.prototype.start = function (server) {
        this.server = server;
    };
    Explorer.prototype.stop = function (server) {
        this.server = server;
    };
    Explorer.prototype.reload = function (server) {
        this.server = server;
    };
    return Explorer;
}(Plugin));
exports["default"] = Explorer;
