[![NPM version](http://img.shields.io/npm/v/generator-mean-stack.svg?style=flat)](http://npmjs.org/generator-mean-stack)
[![NPM downloads](http://img.shields.io/npm/dm/generator-mean-stack.svg?style=flat)](http://npmjs.org/generator-mean-stack)
[![Build Status](http://img.shields.io/travis/jbltx/generator-mean-stack/master.svg?style=flat)](https://travis-ci.org/jbltx/generator-mean-stack)
[![Dependency Status](http://img.shields.io/david/jbltx/generator-mean-stack.svg?style=flat)](https://david-dm.org/jbltx/generator-mean-stack)


# Yeoman generator for MEAN stack projects 


![Alt text](http://i.imgur.com/p5qqOjE.png)

## Introduction

MEAN stack defines application using MongoDB, ExpressJS, AngularJS and NodeJS for a full Javascript development. This generator will help you to start with a solid base, which permits you to code faster. Some usual tasks are handled in sub-generators too.

## Prerequisites

To use the generator, you need some prerequisites :

- **[Node.js with NPM](http://www.nodejs.org/download/)**
- **[MongoDB](http://www.mongodb.org/)** (only needed if you want to use a local database, you could use a MongoDB web service like [Mongolab](https://mongolab.com/) too, but for development purpose it could be useful to have a local database)
- **[Yo](http://yeoman.io/)** - This package manage all Yeoman's generators 

```
$ npm install -g yo
```

- **[Bower](http://bower.io/)** - Bower will manage your frontend dependencies

```
$ npm install -g bower
```

- **[Grunt](http://gruntjs.com/)** - Grunt will automate some tasks to build your app or check if there's no error in your code.

```
$ npm install -g grunt-cli
```

Please make sure to read the documentation of these packages before starting your MEAN project. You also need to know basics about [Express](http://expressjs.com/), [AngularJS](https://angularjs.org/), [Mongoose](http://mongoosejs.com/docs/guide.html) and [Passport](http://passportjs.org/).

## Installation

Install the generator 

```
$ npm install -g generator-mean-stack
```

Make a new directory and cd into it 

```
$ mkdir -p mean-project && cd $_
```

Scaffold a new MEAN stack project 

```
yo mean-stack
```

## Generators

Available generators:

- [mean-stack (or mean-stack:app)](#app)
- [mean-stack:bRoute](#broute) 
- [mean-stack:bModel](#bmodel) (coming soon)
- mean-stack:fRoute (coming soon)

**Note: Generators are to be run from the app root directory**

### App

Sets up a new MEAN stack app, generating all the boilerplate you need to get started.

Example: 

```
$ yo mean-stack
```

### bRoute

Sets up a new route in Express router (located in `app/backend/router/routes` dir).

You can choose if the route has a restricted access (only for users) and if you want a ready CRUD template.

Example:

```
$ yo mean-stack:bRoute
```

**Note: CRUD will create a route AND start the bModel sub-generator to set up a new Mongoose model**

If you want to skip bModel generator, use the `--skip-model` option.

```
$ yo mean-stack:bRoute --skip-model
```

### bModel

Create a new Mongoose model (located in `app/backend/models` dir).

**Suggestion: If you have to make a new route too, use `yo mean-stack:bRoute` instead**

Example:

```
$ yo mean-stack:bModel
```

## Serve and build

The generator makes a gruntfile configuration, so building your app becomes easy.

Build a fresh new distribution :

```
$ grunt
```

Run the app server in development mode :

```
$ grunt serve
```

You can define a `production` target to serve in production mode :

```
grunt serve:production
```

**Note: this last command builds automatically a new distribution before serving.**

## Deployment

Make sure to test your final distribution with Grunt :

```
$ grunt serve:production
```

The final distribution is located in `/build` directory.

```
$ cd build
```

Everything you need is here, you can init a git repo here and push your build :

```
git init && git remote add origin pathToYourProductionServer && git commit -am "Build 1.0.0" && git push origin master
```

**Note: Make sure to configure your .gitignore file inside /build directory to match with your production server specifications.**

**Note2: .git folder and .gitignore file won't be overwritten during new build, but you can add other files too in Gruntfile.js configuration.**

## MEAN-Stack Example

Coming soon...

## License

[MIT License](https://github.com/jbltx/generator-mean-stack/blob/master/LICENSE)
