# he-api

> A User API. 

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/he-api; yarnl
    ```

3. Start your app

    ```
    yarn start
    ```

4. Browse to http://localhost:3030 to test

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.  Coverage stats will provided.

## Dockerfile

1. Build docker image

    ```
    docker build -t he-api-app .
    ```

2. Run the image

    ```
    docker run -p 3030:3030 -t he-api-app
    ```

3. Stop the image.  

    ```
    docker ps
    docker stop [container id]
    ```

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
