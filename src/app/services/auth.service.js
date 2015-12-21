var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var window_service_1 = require('./window.service');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/interval');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/takeWhile');
var Rx = require('rxjs/Rx.KitchenSink');
var AuthService = (function () {
    function AuthService(windows) {
        this.windows = windows;
        this.authenticated = false;
        this.windowHandle = null;
        this.callbackTokenUrl = 'http://localhost:3000/auth/callback';
        this.oAuthTokenUrl = "https://test.pennmutual.com/oauth2/dialog/authorize?redirect_uri=" + this.callbackTokenUrl + "&response_type=token&client_id=a2o2demo&scope=pml_data_access+basic_access";
        this.locationWatcher = new core_1.EventEmitter();
    }
    AuthService.prototype.doOAuthLogin = function () {
        var _this = this;
        console.log('Logging in');
        var mySub = this.locationWatcher.subscribe(function (val) {
            console.log('Received:', val);
        }, function (err) {
            console.log('Received error:', err);
        }, function (complete) {
            console.log('Completed:', complete);
        });
        console.log("Before:", this.locationWatcher);
        this.locationWatcher.emit('Fred');
        console.log("After:", this.locationWatcher);
        setInterval(function () {
            _this.locationWatcher.emit('Gone');
        }, 2000);
    };
    AuthService.prototype.doObservableTest2 = function () {
        console.log('Listening for event');
        this.windowHandle = this.windows.createWindow('http://localhost:3000/', 'OAuth2 Login');
        var counter = 0;
        var source = Observable_1.Observable.fromEvent(this.windowHandle, 'hashchange');
        var mySub = source.subscribe(function (val) {
            console.log('Received:', val);
        }, function (err) {
            console.log('Received error:', err);
        }, function (complete) {
            console.log('Completed:', complete);
        });
    };
    AuthService.prototype.doObservableTest = function () {
        var _this = this;
        this.windowHandle = this.windows.createWindow(this.oAuth2URL(), 'OAuth2 Login');
        var counter = 0;
        var source = Rx.Observable.timer(0, 100)
            .map(function () { return _this.windowHandle.location.href; })
            .takeWhile(function () {
            return counter++ < 5000;
        });
        var mySub = source.subscribe(function (val) {
            console.log('Received:', val);
        }, function (err) {
            console.log('Received error:', err);
        }, function (complete) {
            console.log('Completed:', complete);
        });
    };
    AuthService.prototype.oAuth2URL = function () {
        return this.oAuthTokenUrl;
    };
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return this.authenticated;
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [window_service_1.WindowService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map