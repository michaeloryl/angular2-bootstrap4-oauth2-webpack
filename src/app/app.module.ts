import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";

import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import {PublicPage} from './components/pages/public-page'
import {ProtectedPage} from './components/pages/protected-page'
import {LoggedoutPage} from "./components/pages/loggedout-page";
import {WindowService} from "./services/window.service";
import {AuthService} from "./services/auth.service";
import {CookieService} from "./services/cookies.service";
import {HttpModule} from "@angular/http";

const routes:Routes = [
    {path: 'public', pathMatch: 'full', component: PublicPage},
    {path: 'protected', pathMatch: 'full', component: ProtectedPage},
    {path: '', redirectTo: 'public', pathMatch: 'full'},
    {path: 'loggedout', pathMatch: 'full', component: LoggedoutPage}
];

@NgModule({
    declarations: [AppComponent, PublicPage, ProtectedPage, LoggedoutPage],
    providers: [
        CookieService,
        AuthService,
        WindowService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    imports: [
        HttpModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}