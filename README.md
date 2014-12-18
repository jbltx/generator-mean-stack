[![NPM version](http://img.shields.io/npm/v/generator-mean-stack.svg?style=flat)](http://npmjs.org/generator-mean-stack)
[![NPM downloads](http://img.shields.io/npm/dm/generator-mean-stack.svg?style=flat)](http://npmjs.org/generator-mean-stack)
[![Build Status](http://img.shields.io/travis/jbltx/generator-mean-stack/master.svg?style=flat)](https://travis-ci.org/jbltx/generator-mean-stack)
[![Dependency Status](http://img.shields.io/david/jbltx/generator-mean-stack.svg?style=flat)](https://david-dm.org/jbltx/generator-mean-stack)


# Yeoman generator for MEAN stack projects 


![Alt text](http://i.imgur.com/p5qqOjE.png)

## Introduction

MEAN stack defines application using MongoDB, ExpressJS, AngularJS and NodeJS for a full Javascript development.

## Features

- A MEAN stack app scaffold with HTML5 / CSS3 support
- Sub-generators (coming soon) to create backend routes, models, and frontend routes
- Mail sender support to generate strong authentication with email confirmation
- Already configured CSRF protection for all HTTP requests
- Built-in authentication service using PassportJS with different strategies (cookie-based)
- Support for SASS/SCSS and Autoprefixer
- Many extra features during installation (Bootstrap, Font Awesome, ...)

## Installation

Install the generator `npm install -g generator-mean-stack`

Make a new directory and cd into it `mkdir -p mean-project && cd $_`

Scaffold a new MEAN stack project `yo mean-stack`

## Generators

Available generators:

- [mean-stack (or mean-stack:app)](#app)
- mean-stack:backendRoute (soon)
- mean-stack:backendModel (soon)
- mean-stack:frontendRoute (soon)

**Note: Generators are to be run from the app root directory**

### App

Sets up a new MEAN stack app, generating all the boilerplate you need to get started.

Example: 

```yo mean-stack
```

## Serve and build

The generator makes a gruntfile configuration, so building your app becomes easy.

Build a fresh new distribution :

```grunt
```

Run the app server in development mode :

```grunt serve
```

You can define a ``production`` target to serve in production mode :

```grunt serve:production
```

**NB: this last command build automatically a new distribution before serving.**

## License

[MIT License](https://github.com/jbltx/generator-mean-stack/blob/master/LICENSE)
