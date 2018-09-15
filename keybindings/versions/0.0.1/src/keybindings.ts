import {Plugin, ServerApi} from '../../src/PluginManager';

export default class Explorer extends Plugin {

  server:ServerApi;

  setup(server:ServerApi){
    this.server = server;

    server.addScript(`${__dirname}/htdocs/scripts/dest/keys-min.js`);

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
