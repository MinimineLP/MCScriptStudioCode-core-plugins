declare let srclocation:string;
declare let require: any
declare let __dirname: any
let {Plugin} = require(srclocation+'/PluginManager');

export default class Explorer extends Plugin {

  server;

  setup(server){
    this.server = server;

    server.addScript(`${__dirname}/htdocs/scripts/sweetalert.js`);
    server.addStylesheet(`${__dirname}/htdocs/css/alert.css`);

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
