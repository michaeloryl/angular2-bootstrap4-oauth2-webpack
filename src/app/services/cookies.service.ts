import {Injectable} from "@angular/core";

declare var Cookies:any;

@Injectable()
export class CookieService {
    cookies:any = Cookies; // Cookies is a global scope object

    constructor() {
    }

    getCookie(cookieName) {
        return this.cookies.get(cookieName);
    }

    getAllCookies() {
        return this.cookies.get();
    }

    setCookie(name:string, value:string, path:string = '/', domain:string, expiresInDays:number = 0) {
        var options:any = {};
        options.path = path;
        if (domain) {
            options.domain = domain;
        }
        if (expiresInDays > 0) {
            options.expires = expiresInDays;
        }

        this.cookies.set(name, value, options);
    }
}