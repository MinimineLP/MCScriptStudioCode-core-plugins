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
var PluginManager_1 = require("../../src/PluginManager");
var Explorer = /** @class */ (function (_super) {
    __extends(Explorer, _super);
    function Explorer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Explorer.prototype.setup = function (server) {
        this.server = server;
        server.addScript(__dirname + "/htdocs/scripts/dest/explorer.js");
        server.addStylesheet(__dirname + "/htdocs/css/explorer.min.css");
        server.addFile(__dirname + "/htdocs/images/explorericons/folder.png", "/images/explorericons/folder.png");
        server.addFile(__dirname + "/htdocs/images/explorericons/mcfunction.png", "/images/explorericons/mcfunction.png");
        server.addFile(__dirname + "/htdocs/images/explorericons/mcmeta.png", "/images/explorericons/mcmeta.png");
        server.addFile(__dirname + "/htdocs/images/explorericons/mcscript.png", "/images/explorericons/mcscript.png");
        server.addFile(__dirname + "/htdocs/images/explorericons/unknown.png", "/images/explorericons/unknown.png");
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
}(PluginManager_1.Plugin));
exports["default"] = Explorer;
