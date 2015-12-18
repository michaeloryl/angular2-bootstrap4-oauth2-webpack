/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:57 AM
 */
import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
@Directive({
    selector: '[protected]'
})
export class ProtectedDirective {
    constructor(private _el: ElementRef, renderer: Renderer) {
        //renderer.setElementStyle(_el, 'backgroundColor', 'yellow');
    }
}