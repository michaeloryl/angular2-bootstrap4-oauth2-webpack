/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
import {Component} from "angular2/core";

@Component({
    selector: 'public-page',
    directives: [],
    pipes: [],
    template: `
<div>I'm public</div>
`
})
export class PublicPage {
    constructor() {
        console.log("Public instantiated");
    }
}
