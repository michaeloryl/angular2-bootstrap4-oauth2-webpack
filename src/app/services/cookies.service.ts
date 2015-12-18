import {Injectable} from "angular2/core";

@Injectable()
export class CookieService {
    cookies = Cookies; // Cookies is a global scope object

    constructor() {
    }

    getCookie(cookieName) {
        return this.cookies.get(cookieName);
    }

    getAllCookies() {
        return this.cookies.get();
    }

    setCookie(name:string, value:string, path:string = '/', domain:string, expiresInDays:number = 0) {
        var options = {};
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