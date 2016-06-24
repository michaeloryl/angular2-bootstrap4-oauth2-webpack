/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 6/23/16
 * Time: 9:51 PM
 */
import {PublicPage} from './components/pages/public-page'
import {ProtectedPage} from './components/pages/protected-page'
import {LoggedoutPage} from "./components/pages/loggedout-page";

export const AppRoutes = [
    { path: '', redirectTo: 'public' },
    { path: 'public', component: PublicPage },
    { path: 'protected', component: ProtectedPage },
    { path: 'loggedout', component: LoggedoutPage }
];

