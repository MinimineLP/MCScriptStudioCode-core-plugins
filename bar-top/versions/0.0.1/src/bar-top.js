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
        server.addScript(__dirname + "/htdocs/scripts/dest/bar-top-min.js");
        server.addStylesheet(__dirname + "/htdocs/css/bar-top.min.css");
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
