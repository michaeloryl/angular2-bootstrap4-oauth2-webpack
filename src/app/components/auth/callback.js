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
var CallbackComponent = (function () {
    function CallbackComponent() {
    }
    CallbackComponent = __decorate([
        core_1.Component({
            selector: 'callback',
            directives: [],
            pipes: [],
            template: "\n<div>I'm an OAuth2 Callback</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], CallbackComponent);
    return CallbackComponent;
})();
exports.CallbackComponent = CallbackComponent;
//# sourceMappingURL=callback.js.map