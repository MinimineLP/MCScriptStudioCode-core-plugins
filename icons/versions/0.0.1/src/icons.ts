declare let srclocation:string;
declare let require: any
declare let __dirname: any
let {Plugin} = require(srclocation+'/PluginManager');

export default class Explorer extends Plugin {

  server;

  setup(server){
    this.server = server;

    server.addFile(`${__dirname}/htdocs/fonts/MaterialIcons-Regular.eot`, `/fonts/MaterialIcons-Regular.eot`);
    server.addFile(`${__dirname}/htdocs/fonts/MaterialIcons-Regular.ttf`, `/fonts/MaterialIcons-Regular.ttf`);
    server.addFile(`${__dirname}/htdocs/fonts/MaterialIcons-Regular.woff`, `/fonts/MaterialIcons-Regular.woff`);
    server.addFile(`${__dirname}/htdocs/fonts/MaterialIcons-Regular.woff2`, `/fonts/MaterialIcons-Regular.woff2`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/fonts/materialdesignicons-webfont.eot`, `/fonts/materialdesignicons-webfont.eot`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/fonts/materialdesignicons-webfont.eot`, `/fonts/materialdesignicons-webfont.eot`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/fonts/materialdesignicons-webfont.woff2`, `/fonts/materialdesignicons-webfont.woff2`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/fonts/materialdesignicons-webfont.woff`, `/fonts/materialdesignicons-webfont.woff`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/fonts/materialdesignicons-webfont.ttf`, `/fonts/materialdesignicons-webfont.ttf`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/fonts/materialdesignicons-webfont.svg`, `/fonts/materialdesignicons-webfont.svg`);
    server.addFile(`${__dirname}/htdocs/@mdi/font/css/materialdesignicons.css`,"/materialdesignicons.css");
    server.addFile(`${__dirname}/htdocs/@mdi/font/css/materialdesignicons.css.map`,"/materialdesignicons.css.map");
    server.addFile(`${__dirname}/htdocs/@mdi/font/css/materialdesignicons.min.css.map`,"/materialdesignicons.min.css.map");
    server.addStylesheet(`${__dirname}/htdocs/@mdi/font/css/materialdesignicons.min.css`);
    server.addStylesheet(`${__dirname}/htdocs/css/material-icons.min.css`);

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
