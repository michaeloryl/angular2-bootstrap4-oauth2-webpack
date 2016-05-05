declare var require;

import 'reflect-metadata';
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone'); // for development only - not needed for prod deployment

require('./css/bootstrap.css');
require('./css/main.css');

import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router-deprecated';

require('./lib/bootstrap/bootstrap.js');

