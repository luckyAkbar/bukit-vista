# BUKIT VISTA Internship Test

#### Made to fulfill internship requirement

## Techs Stack

- [ExpressJS](https://expressjs.com/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize ORM](https://sequelize.org/)
- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

## Deployed On

- [Alibaba Cloud](https://id.alibabacloud.com/en)
- [Ubuntu Server](https://ubuntu.com/)
- [Nginx](https://www.nginx.com/)

## Live Version

if you want to see / use the live version of this app, feel free to point your request to [here](https://intern-test.luckyakbar.tech)

## How To Run

Before going there, i want you to know a few dependencies before running this app:<br>

- OS: linux family, Ubuntu is the recomended one
- Docker: please install docker on your machine
- Docker compose: please install docker-compose on your machine

<br>Assuming that you are already using Ubuntu / Linux, Have docker and docker-compose installed, follow this step to run the app:<br>

- clone the master branch of this repository
- run: `cd bukit-vista`
- create your .env file. The most simple one is by running this command: `cp .env.example .env` this way you will have enough environment variable to run this app
- run: `docker-compose up -d` This command will execute docker instruction to generate the infrastructures
- run: `docker exec -it bukit_vista_http_1 npm run migrate` to initialize the database structure (e.g tables)
- run: `docker exec -it bukit_vista_http_1 npm run seed` to initialize the data inside the database
- now the HTTP server is ready on `http://localhost:9000`. If you specify another value in `HTTP_SERVER_PORT` in .env file, the HTTP server should listen on that port.

## API DOCS

Here are the API specs to be followed

- Login
  <br> Used to get access token for accessing other resources on this API. All endpoint other than this require access token to access.
  <br> descriptions:
  - endpoint: **/login**
  - method: **POST**
  - payload:
    - id (number)
    - password (string)
  - Content-Type: application/json
  - response:
    - if the _id_ and _password_ match with DB, the request will contain:
      - Content-Type: application/json
      - body:
        - token (string)
    - otherwise
      - status: 404
  - note:
    - for testing only, you can use the default user credentials below:
      - id: 1
      - password: 123456
- Search Movie
  <br> Used to get movie data from OMDB. Key to search are based on movie title.
  <br>descriptions:

  - endpoint: **/movies/:movieTitle**
  - method: **GET**
  - authorization: bearer
  - response:
    - if OMDB API found the searched movie, the return value will be:
      - Content-Type: application/json
      - body:
        - result: (Array of movie data, such as below)
          - Title (string)
          - Poster (string)
          - Year (string)
          - imdbID (string)
          - etc
    - otherwise:
      - status: 404
      - body:
        - message: "Movie Not Found!"

- Save Favourite Movie
  <br> Used to save your favourite movie data from OMDB. The key used is a valid imdbID.
  <br> descriptions:

  - endpoint: **/movie/favourite**
  - method: **POST**
  - authorization: bearer
  - Content-Type: application/json
  - body:
    - imdbID (string)
  - note:
    - imdbID must be a valid value. If invalid / not found in OMDB, the server will return 400 Bad Request Error

- Get Favourite Movies
  <br> Used to fetch all the available movie data from OMDB which previously saved by user from movie's imdbID.
  <br> descriptions:

  - endpoint: **/movies/favourite**
  - method: **GET**
  - authorization: bearer
  - body:
    - list: (Array)
      - data:
        - Title (string)
        - Year (string)
        - Posters (string)
        - Actors (string
        - etc depends on OMDB data

- Get Fafourite Movies Posters only
  <br>Used to fetch only the posters from user's favourite movie
  <br> descriptions:
  - endpoint: **/movies/favourite**
  - method: **GET**
  - authorization: bearer
  - body:
    - posters: (Array of strings)
