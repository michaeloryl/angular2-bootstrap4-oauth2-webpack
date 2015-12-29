require('./css/bootstrap.css');
require('./css/main.css');

import 'angular2/bundles/angular2-polyfills';

import 'angular2/platform/browser';
import 'angular2/core';
import 'angular2/http';
import 'angular2/router';

// FOR WHATEVER REASON, THESE MUST COME AFTER THE ANGULAR2-POLYFILLS IMPORT
require('./lib/jquery/jquery.min.js');
require('./lib/bootstrap/bootstrap.js');

/* // Can't get this to work through Webpack so far
require('./lib/js.cookie/js.cookie.js');
*/
