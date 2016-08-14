/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:56 AM
 */
import {Component} from "@angular/core";

@Component({
    selector: 'protected-page',
    directives: [],
    pipes: [],
    template: `
<div class="pos-f-t">
    <navbar></navbar>
</div>
<div protected>I'm protected</div>
`
})
export class ProtectedPage {
    constructor() {
    }
}
