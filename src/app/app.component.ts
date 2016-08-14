import {Component} from "@angular/core";
//import 'rxjs/Rx'; // this would import all RxJS operators
import "rxjs/add/operator/map";

@Component({
    selector: 'app',
    template: `
<div class="container-fluid">
    <router-outlet></router-outlet>
</div>
`
})
export class AppComponent {
}

