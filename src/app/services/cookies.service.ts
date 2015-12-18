import {Injectable} from "angular2/core";

@Injectable()
export class CookieService { // Cookies is a global scope object
    constructor() {
    }

    getCookie(cookieName) {
        return Cookies.get(cookieName);
    }
}