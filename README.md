# Smart-X-Vue

A library of reactive components for rapid development.

## Getting Started

In order to run this project, you will need Node.js and NPM installed on your machine.

### Prerequisites

Please go to http://nodejs.org to install Node if you do not have it installed on your machine.

Check to see if you have Node
```
node --version

# v8.12.0
```

Check to see if you nave NPM
```
npm --version

# 6.4.1
```

### Installing

Install smart-x-vue

```
npm install
```

## Running the tests

Run automated unit tests to ensure components remain functional.

### Run unit tests

Test each component with Jest and vue-test-utils. Each component should pass a suite of tests that make sure the desired functionality still works.

```
npm run unit
```

Or to test a specific component

```
# npm run unit:[component-name]

npm run unit:smart-table
```

## Built With

* [Vue](https://vuejs.org) - Components developed with Vue.js
* [Jest](https://jestjs.io/) - Unit tested with Jest
* [Vue Test Utils](https://vue-test-utils.vuejs.org/) - Also unit tested with vue-test-utils
* [Vuese](https://vuese.org) - Docs generated with vuese

## Authors

* **James Stanger** - *Project author* - [stangerjm](https://github.com/stangerjm)

## License

This project is licensed under the MIT License
