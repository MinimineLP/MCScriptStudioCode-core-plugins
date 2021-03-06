declare let srclocation:string;
declare let require: any
declare let __dirname: any
let {Plugin} = require(srclocation+'/PluginManager');

export default class Explorer extends Plugin {

  server;

  setup(server){
    this.server = server;



    server.addScript(`${__dirname}/htdocs/scripts/dest/sweetalert-min.js`);

		server.addScript(`${__dirname}/htdocs/codemirror/lib/codemirror.js`);

		server.addScript(`${__dirname}/htdocs/codemirror/addon/dialog/dialog.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/search/searchcursor.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/search/search.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/scroll/annotatescrollbar.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/search/matchesonscrollbar.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/search/jump-to-line.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/selection/active-line.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/edit/matchbrackets.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/display/fullscreen.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/scroll/simplescrollbars.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/edit/closetag.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/foldcode.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/foldgutter.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/brace-fold.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/xml-fold.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/indent-fold.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/markdown-fold.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/fold/comment-fold.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/selection/active-line.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/mode/simple.js`);
		server.addScript(`${__dirname}/htdocs/codemirror/addon/mode/overlay.js`);

    server.addScript(`${__dirname}/htdocs/codemirror/addon/hint/javascript-hint.js`);
    server.addScript(`${__dirname}/htdocs/codemirror/mode/javascript/javascript.js`);

		server.addScript(`${__dirname}/htdocs/codemirror/mode/scheme/scheme.js`);

		server.addStylesheet(`${__dirname}/htdocs/codemirror/lib/codemirror.css`);

		server.addStylesheet(`${__dirname}/htdocs/codemirror/addon/hint/show-hint.css`);
		server.addStylesheet(`${__dirname}/htdocs/codemirror/addon/dialog/dialog.css`);
		server.addStylesheet(`${__dirname}/htdocs/codemirror/addon/search/matchesonscrollbar.css`);
		server.addStylesheet(`${__dirname}/htdocs/codemirror/addon/display/fullscreen.css`);
		server.addStylesheet(`${__dirname}/htdocs/codemirror/addon/scroll/simplescrollbars.css`);
		server.addStylesheet(`${__dirname}/htdocs/codemirror/addon/fold/foldgutter.css`);

    server.addScript(`${__dirname}/htdocs/codemirror/mode/xml/xml.js`);
    server.addScript(`${__dirname}/htdocs/codemirror/mode/markdown/markdown.js`);
    server.addScript(`${__dirname}/htdocs/codemirror/mode/gfm/gfm.js`);
    server.addScript(`${__dirname}/htdocs/codemirror/mode/javascript/javascript.js`);
    server.addScript(`${__dirname}/htdocs/codemirror/mode/css/css.js`);
    server.addScript(`${__dirname}/htdocs/codemirror/mode/htmlmixed/htmlmixed.js`);

    server.addScript(`${__dirname}/htdocs/scripts/dest/language-mcfunction-min.js`);
    server.addScript(`${__dirname}/htdocs/scripts/dest/language-mcscript-min.js`);
    server.addScript(`${__dirname}/htdocs/scripts/dest/editor.js`);
    server.addScript(`${__dirname}/htdocs/scripts/dest/MineEditor-min.js`);
    server.addScript(`${__dirname}/htdocs/scripts/dest/MinMineEditor-min.js`);
    server.addStylesheet(`${__dirname}/htdocs/css/global.min.css`);

  }

  start(server){
    this.server = server;
  }

  stop(server){
    this.server = server;
  }

  reload(server) {
    this.server = server;
  }
}
