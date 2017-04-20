/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
declare var System: any;

System.config({
  paths: {
    // paths serve as alias
    'npm:': 'node_modules/'
  },
  // map tells the System loader where to look for things
  map: {
    // our app is within the app folder
    'app': 'app',
    'main': 'app/main.js',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

    // other libraries
    'rxjs':                      'npm:rxjs',
    '@ngrx/core': 'npm:@ngrx/core',
    '@ngrx/store': 'npm:@ngrx/store',
    '@ngrx/store-devtools': 'npm:@ngrx/store-devtools',
    'xml2js' : 'npm:xml2js',
    'cxml' : 'npm:cxml',
    'bluebird' : 'npm:bluebird',
    'sax' : 'npm:sax',
    'stream': 'npm:stream',
    'string_decoder': 'npm:string_decoder',
    'buffer': 'npm:buffer',
    'emitter': 'npm:browser-emitter',
    'ieee754': 'npm:ieee754',
    'base64-js': 'npm:base64-js',
    'asynclist': 'npm:asynclist',
    'util': 'npm:util',
    'eventproxy': 'npm:eventproxy',
    'inherits': 'npm:inherits',
    'process': 'npm:process'
  },
  // packages tells the System loader how to load when no filename and/or no extension
  packages: {
    'app': { main: './main.js', defaultExtension: 'js' },
    'api' : { defaultExtension : 'js' },
    'rxjs': { defaultExtension: 'js' },

    xml2js: {
      main: 'lib/xml2js.js', 
      defaultExtension: 'js'
    },
    stream: {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    buffer: {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    string_decoder: {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    util: {
      main: 'util.js', 
      defaultExtension: 'js'
    },
    eventproxy: {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    process: {
      main: 'browser.js', 
      defaultExtension: 'js'
    },
    inherits: {
      main: 'inherits_browser.js', 
      defaultExtension: 'js'
    },
    asynclist: {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    'base64-js': {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    ieee754: {
      main: 'index.js', 
      defaultExtension: 'js'
    },
    emitter: {
      main: 'Emitter.js', 
      defaultExtension: 'js'
    },
    sax: {
      main: 'lib/sax.js',
      defaultExtension: 'js'        
    },
    xmlbuilder: {
      main: 'lib/index.js', 
      defaultExtension: 'js'        
    },
    cxml: {
      main: 'dist/cxml.js', 
      defaultExtension: 'js'        
    },
    bluebird: {
      main: 'js/browser/bluebird.js', 
      defaultExtension: 'js'        
    },
    '@ngrx/core': {
        main: 'bundles/core.umd.js',
        defaultExtension: 'js'
    },
    '@ngrx/store': {
        main: 'bundles/store.umd.js',
        defaultExtension: 'js'
    },
    '@ngrx/store-devtools': {
        main: 'bundles/store-devtools.umd.js',
        defaultExtension: 'js'
    }

    // barrels
    // 'app/core':   { main: 'index'},
    // 'app/models': { main: 'index'},
  }
});
