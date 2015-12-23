/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:56 AM
 */
import {Component} from "angular2/core";
import {Navbar} from '../../components/navbar/navbar';
import {ProtectedDirective} from "../../directives/protected.directive";

@Component({
    selector: 'protected-page',
    directives: [Navbar, ProtectedDirective],
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
        //console.log("Protected instantiated");
    }
}
