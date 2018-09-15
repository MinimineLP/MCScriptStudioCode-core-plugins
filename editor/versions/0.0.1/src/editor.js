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
        server.addScript(__dirname + "/htdocs/codemirror/lib/codemirror.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/dialog/dialog.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/search/searchcursor.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/search/search.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/scroll/annotatescrollbar.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/search/matchesonscrollbar.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/search/jump-to-line.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/selection/active-line.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/edit/matchbrackets.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/display/fullscreen.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/scroll/simplescrollbars.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/edit/closetag.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/foldcode.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/foldgutter.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/brace-fold.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/xml-fold.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/indent-fold.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/markdown-fold.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/fold/comment-fold.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/selection/active-line.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/mode/simple.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/mode/overlay.js");
        server.addScript(__dirname + "/htdocs/codemirror/addon/hint/javascript-hint.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/javascript/javascript.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/scheme/scheme.js");
        server.addStylesheet(__dirname + "/htdocs/codemirror/lib/codemirror.css");
        server.addStylesheet(__dirname + "/htdocs/codemirror/addon/hint/show-hint.css");
        server.addStylesheet(__dirname + "/htdocs/codemirror/addon/dialog/dialog.css");
        server.addStylesheet(__dirname + "/htdocs/codemirror/addon/search/matchesonscrollbar.css");
        server.addStylesheet(__dirname + "/htdocs/codemirror/addon/display/fullscreen.css");
        server.addStylesheet(__dirname + "/htdocs/codemirror/addon/scroll/simplescrollbars.css");
        server.addStylesheet(__dirname + "/htdocs/codemirror/addon/fold/foldgutter.css");
        server.addScript(__dirname + "/htdocs/codemirror/mode/xml/xml.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/markdown/markdown.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/gfm/gfm.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/javascript/javascript.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/css/css.js");
        server.addScript(__dirname + "/htdocs/codemirror/mode/htmlmixed/htmlmixed.js");
        server.addScript(__dirname + "/htdocs/scripts/dest/language-mcfunction-min.js");
        server.addScript(__dirname + "/htdocs/scripts/dest/language-mcscript-min.js");
        server.addScript(__dirname + "/htdocs/scripts/dest/editor.js");
        server.addScript(__dirname + "/htdocs/scripts/dest/MineEditor-min.js");
        server.addStylesheet(__dirname + "/htdocs/css/global.min.css");
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
