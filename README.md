# A2B4O2OM
#### Angular 2, Bootstrap 4, OAuth2, oh my!
Angular 2 skeleton app with Bootstrap 4 and OAuth2 integration, all packaged up and served with Webpack

## Introduction

This application is meant to be a starting point for you to work with Angular 2 and OAuth2, with the added benefits of itegrating the upcoming Bootstrap 4 (in alpha as this project was started) and packaging everything in an easy to use system through the use of Webpack.

There are some basic Grunt tasks defined that will help you create custom builds of Bootstrap or to change the configuration of your application's OAuth2 config. More tasks will be added as the needs surface.

# Table of Contents
 - [Getting started](#getting-started)
 - [Changing config environment](#changing-config-environment)
 - [Configuring for OAuth2](#configuring-for-oauth2)
 - [Deploying the code](#deploying-the-code)
 - [Customizing Bootstrap 4](#customizing-bootstrap-4)
 - [Building Bootstrap 4](#building-bootstrap-4)

## Getting started

To get started with A2B4O2OM you will need to clone the repository to your local machine and `cd` into it:

    git clone https://github.com/michaeloryl/angular2-bootstrap4-oauth2-webpack.git
    cd angular2-bootstrap4-oauth2-webpack

Once that has been done, you will need to ensure that you have Node.js already installed.  You can download it from the [Node.js website](https://nodejs.org/en/download/).  I've developed this with the 0.12.x branch, but the newer branches should work as well.

Installing Node.js will have the side-effect of installing `npm`, which you will use to download and install all of the application's dependencies.  You can do that by running the following command from the main project folder.

```
npm install
```

You will also need to install one package globally so that you can run it from the command line:

```
npm install -g webpack-dev-server
```

Now that you have the dependencies installed, you should be able to run the applcation with the following command:

```
npm start
````

That will compile all of the project's TypeScript (ECMAScript 2015) files into ES5 JavaScript, bundle them with your various internal and external depenencies, and launch them inside a server running on port 3000.  You can then hit [http://localhost:3000/](http://localhost:3000/) to see the application running on your machine.

By default it will be configured to integrate with a sample Google OAuth2 client I've configured.  That client will ask for permission to access your basic profile information so that it can show your name on the logout button.  If you want to see that in action, just hit the `Login` button in the upper right hand corner of the webapp.

Note that as of Beta.4 of Angular2, you will see some error messages upon startup regarding `require`.  These can safely be ignored for now.  An example of the messages follows:

```
ERROR in ./src/vendor.ts
(1,1): error TS2304: Cannot find name 'require'.

ERROR in ./src/vendor.ts
(2,1): error TS2304: Cannot find name 'require'.

ERROR in ./src/vendor.ts
(12,1): error TS2304: Cannot find name 'require'.
```

## Changing config environment

A2B4O2OM currently uses a rudimentary environment-based config system that allows you to have different OAuth2 configurations setup for running locally, in dev, in test, or in production.  There's also one for using my demo Google OAuth2 credentials.  These Grunt tasks will copy the appropriate file from `config/` and overwrite the `config.json` file in the `src/` folder, with predjudice.

Choose one of the following commands based upon the environment you wish to load in the source code.

```
grunt env:local
grunt env:dev
grunt env:test
grunt env:prod
grunt env:google
```

Use the Google environment if you just want to see OAuth2 in action and you don't have your own server configured.  The other files will have to be updated by you, the user, to work with your own OAuth2 infrastructure.

## Configuring for OAuth2

You'll find several config files in the `/config` folder of the project.  The `config.local.json` file, for example, looks similar to the following:

```
{
  "callbackUrl": "http://localhost:3000/auth/callback",
  "implicitGrantUrl": "http://localhost:3001/auth?redirect_uri=__callbackUrl__&response_type=token&client_id=__clientId__&scope=__scopes__",
  "userInfoUrl": "http://localhost:3001/userinfo",
  "userInfoNameField": "nameOfFullnameField",
  "clientId": "a2o2demo",
  "scopes": "yourscopes+gohere"
}
```
It is configured as if you had an OAuth2 server running on port 3001 of your local machine.  I'll explain what each entry in the file means.

`callbackUrl` is the URL that the OAuth2 server should redirect the user to so that our application can fetch the access token from the browser window.  This **must** be using the same domain, subdomain, protocol, and port as your main A2B4O2OM application, otherwise the app will be restricted by the browser from accessing the popup browser window.

`implicitGrantUrl` is the main authorization URL of the OAuth2 server in use.  The `__callbackUrl__`, `__clientId__`, and `__scopes__` tokens in the value get replaced with the actual values you configure in this JSON config file.  This allows you to keep things easy to read while still allowing you to change the format of the URL easily.

A2B4O2OM is configured for using an OAuth2 Implicit grant type request, which means it gets an access token directly and has no option for a refresh token.  Storing refresh tokens and client secrets in a client-side JavaScript application is a **very bad thing**, which is why we don't use the Authorization Code grant type.

`userInfoUrl` is the OAuth2 URL to use to gain access to a user's basic information.  The access token will be inserted into the headers of the request as a bearer token in an Authorization header.

`userInfoNameField` is the name of the full name field in the JSON payload returned by the `userInfoUrl` endpoint.  Google calls it 'displayName', my personal server calls it 'name'.  Hence the reason to have it configurable.

`clientId` is the ID assigned to your new application by the OAuth2 administrator.  There's no need for the associated client secret (password) in our use case.

`scopes` is the list of '+' separated scopes of data you are requesting.  This will be different for each OAuth2 server you come across, most likely.
## Deploying the code

If you wish to deploy your application to a real web server, production or otherwise, you can use the appropriate grunt tasks to do so.  To build a test/dev build of the site, run the following command:

```
grunt build
```

If you require a production ready version of the application that has debugging disabled and has been uglified, then use this command instead:

```
grunt build:prod
```

Note that the prod build command will also do a 'grunt env:prod' to copy `config/config.prod.json` to `src/config.json` before running webpack and building the ZIP file.  If you wish to continue in a non-prod environment after building for prod, you will need to execute the appropriate Grunt `env` command (`env:dev`, `env:local`, `env:test`)

## Customizing Bootstrap 4

By default, A2B4O2OM ships with a slightly customized version of Bootstrap 4 that differs from what ships in the NPM.  That's why you will find it residing in the separate `/bootstrap` folder instead of in `/NODE_MODULES`.

The changes can be found in `/bootstrap/scss/_variables.scss`, which is the main config file used when Building Bootstrap 4.  The changes I've made are the following.

The first four modifications change the general look of the framework.  Shadows are necessary for the navbar's look to work, and the others are just things I find generally pleasing.

```
$enable-shadows:            true !default;  // was false
$enable-gradients:          true !default;  // was false
$enable-transitions:        true !default;  // was false
$enable-hover-media-query:  true !default;  // was false
```
The other two modifications change what the framework considers to be a small sized screen so that a large smartphone in landscape mode won't be forced to make use of the collapsing menu system in the navbar.

```
$grid-breakpoints: (
  // Extra small screen / phone
  xs: 0,
  // Small screen / phone
  sm: 480px,                                // was 544
  // Medium screen / tablet
  md: 768px,
  // Large screen / desktop
  lg: 992px,
  // Extra large screen / wide desktop
  xl: 1200px
) !default;

// Grid containers
//
// Define the maximum width of `.container` for different screen sizes.

$container-max-widths: (
  sm: 434px,                               // was 576
  md: 720px,
  lg: 940px,
  xl: 1140px
) !default;
```

You will find two files named `_variables-ORIGINAL.scss` and `_variables-CUSTOM.scss` in the same folder that will allow you to compare and easily copy the default and custom settings over top of `_variables.scss`.

## Building Bootstrap 4

Once you have it customized, you can use the main project's Grunt setup to build Bootstrap 4 and to copy the needed CSS and JS files into the main A2B4O2OM application.  The build command to run is:

```
grunt bootstrap
```

Once complete, you will see any modifications you made to `/bootstrap/scss/_variables.scss` (or elsewhere) reflected in `/src/lib/bootstrap/bootstrap.js` and `/src/css/bootstrap.css` where Webpack will pick them up.
