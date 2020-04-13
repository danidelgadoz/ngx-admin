# NgxAdmim (Angular 9)

The goal of this project is to provide a starter with strong architecture concepts, best practices and several Angular features. The sample relies on the Angular CLI to build the application. 

This project is result of my experience since Angular.JS, reading angular docs, virtual courses, contribuiding on stackoverflow and reviewing other angular projects on github.

## Features

* Templates such as Auth (login, register), Dashboard (sidenav, navbar, content, footer), Not found Page
* Authentication and Authorization (OAuth2)
* Routing navigation
* Resource security
* CRUD using RESTful services
* Grid pagination
* Third backend integration
* Angular best practices susch as `lazy loading modules`, `eager modules`, `core modules`, `shared modules`, `feature modules`, `singleton services`, `feature services`, `change detection`
* Key Angular features such as `components`, `modules`, `services`, `guards`, `interceptors`, `routing`, `http`, `reactive forms`, `lifecycle hooks` and others.
* Unit test examples with `Jasmine framework`
* Core style distribution with `Sass`

## Sources

* https://angular.io/guide/styleguide
* https://app.pluralsight.com/library/courses/angular-architecture-best-practices
* https://app.pluralsight.com/library/courses/best-practices-angular/table-of-contents
* https://www.udemy.com/course/testing-angular-apps/

## Running the Application

1. Install the latest LTS version of Node.js from https://nodejs.org.

1. Install the Angular CLI: `npm install -g @angular/cli`

1. Open the `ngx-admin` folder and run `npm install`

1. Run `ng serve -o` in the `ngx-admin` folder to start the server and launch the app

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
