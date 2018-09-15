import {Plugin, ServerApi} from '../../src/PluginManager';

export default class Explorer extends Plugin {

  server:ServerApi;

  setup(server:ServerApi){
    this.server = server;

    server.addScript(`${__dirname}/htdocs/scripts/sweetalert.js`);
    server.addStylesheet(`${__dirname}/htdocs/css/alert.css`);

  }

  start(server:ServerApi){
    this.server = server;
  }

  stop(server:ServerApi){
    this.server = server;
  }

  reload(server: ServerApi) {
    this.server = server;
  }
}
