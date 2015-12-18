/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:56 AM
 */
import {Component} from "angular2/core";

@Component({
    selector: 'protected-page',
    directives: [],
    pipes: [],
    template: `
<div>I'm protected</div>
`
})
export class ProtectedPage {
    constructor() {
        //console.log("Protected instantiated");
    }
}
