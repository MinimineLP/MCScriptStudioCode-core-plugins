declare let srclocation:string;
declare let require: any
declare let __dirname: any
let {Plugin} = require(srclocation+'/PluginManager');

export default class Explorer extends Plugin {

  server;

  setup(server){
    this.server = server;

    server.addScript(`${__dirname}/htdocs/scripts/dest/bar-top-min.js`);
    server.addStylesheet(`${__dirname}/htdocs/css/bar-top.min.css`);

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
