/**
 * Created by mfo on 12/15/15.
 */

import {Pipe, PipeTransform} from "angular2/core";

@Pipe({
    name: `reverse`,
})
export class ReversePipe {
    transform(str:string, [param1]) {
        return str.split("").reverse().join("");
    }
}