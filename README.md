# he-api

>  A user persistence layer API.

## About

An implementation of a user API as described by https://github.com/holidayextras/culture/blob/master/recruitment/developer-API-task.md

Uses the [Feathers](http://feathersjs.com), an open source web framework for building modern real-time applications.

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

5. A demo is hosted at http://api.awaylaughing.uk/

## Basis usage

1. To list user: http://localhost:3030/users

2. To add a user:

```
curl --request POST \
  --url 'http://api.awaylaughing.uk/users' \
  --header 'Content-Type: application/json' \
  --data '{
  "email" : "fred.dag@test.com",
  "forename" : "Fred",
  "surname" : "Dag"

}'
```

> See postman collection for more details

## Postman

1. Postman collection at https://documenter.getpostman.com/view/3814840/he-api/RVtyqCN4#9f73f16d-25fc-3594-1ad5-40f8109e941f or in postman.json

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
