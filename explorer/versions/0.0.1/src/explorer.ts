declare let srclocation:string;
declare let require: any
declare let __dirname: any
let {Plugin} = require(srclocation+'/PluginManager');

export default class Explorer extends Plugin {

  server;

  setup(server){
    this.server = server;

    server.addScript(`${__dirname}/htdocs/scripts/dest/explorer.js`);
    server.addStylesheet(`${__dirname}/htdocs/css/explorer.min.css`);
    server.addFile(`${__dirname}/htdocs/images/explorericons/folder.png`,"/images/explorericons/folder.png");
    server.addFile(`${__dirname}/htdocs/images/explorericons/mcfunction.png`,"/images/explorericons/mcfunction.png");
    server.addFile(`${__dirname}/htdocs/images/explorericons/mcmeta.png`,"/images/explorericons/mcmeta.png");
    server.addFile(`${__dirname}/htdocs/images/explorericons/mcscript.png`,"/images/explorericons/mcscript.png");
    server.addFile(`${__dirname}/htdocs/images/explorericons/unknown.png`,"/images/explorericons/unknown.png");

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
