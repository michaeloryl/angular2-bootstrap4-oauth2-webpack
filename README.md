# A2B4O2OM
#### Angular 2, Bootstrap 4, OAuth2, oh my!
Angular 2 skeleton app with Bootstrap 4, OAuth2 integration, all packaged up and served with Webpack

## Introduction

This application is meant to be a starting point for you to work with Angular 2 and OAuth2, with the added benefits of itegrating the upcoming Bootstrap 4 (in alpha as this project was started) and packaging everything in an easy to use system through the use of Webpack.

There are some basic Grunt tasks defined that will help you create custom builds of Bootstrap or to change the configuration of your application's OAuth2 config. More tasks will be added as the needs surface.

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
webpack-dev-server
````

That will compile all of the project's TypeScript (ECMAScript 2015) files into ES5 JavaScript, bundle them with your various internal and external depenencies, and launch them inside a server running on port 3000.  You can then hit [http://localhost:3000/](http://localhost:3000/) to see the application running on your machine.

By default it will be configured to integrate with a sample Google OAuth2 client I've configured.  That client will ask for permission to access your basic profile information so that it can show your name on the logout button.  If you want to see that in action, just hit the `Login` button in the upper right hand corner of the webapp.

## Deploying the code

If you wish to deploy the code to an actual web server, you will need to first run the following `webpack` command in order to create your code bundles and place them into the `__build__` folder.

```
webpack
```

You would then need to copy `src/index.html`, `src/lib`, and `__build__` into the root of your server.  I'm planning to include a grunt task to handle all that but haven't gotten around to it yet.  If somebody would like to build that functionality out and send me a pull request, that would be great.
