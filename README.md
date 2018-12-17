# address-book-api [![Build Status](https://travis-ci.com/alexsalomon/address-book-api.svg?branch=master)](https://travis-ci.com/alexsalomon/address-book-api)

An address book API

## Commands
Command             | Action                   |
--------------------|--------------------------|
`npm run dev`       | Run in development mode  |
`npm start`         | Run in default mode      |
`npm test`          | Run the tests once       |
`npm test-watch`    | Run and watch the tests  |
`npm run lint`      | Lint the code            |
`npm run docs`      | Update API documentation |

## Set up
* Install GIT, NodeJS 10+, NPM and MongoDB (or Docker).
```sh
# Clone the repo and change directory
$ git clone https://github.com/alexsalomon/address-book-api.git && cd address-book-api

# Install NPM dependencies
$ npm install

# Optional: install Nodemon to automatically refresh the server when making changes
$ sudo npm install -g nodemon
```

## Docker support

Instead of downloading and setting up MongoDB locally, use docker for development by running the following commands:

```sh
$ docker-compose build --force-rm   # Build the services and remove intermediate containers
$ docker-compose up                 # Builds, (re)creates, starts, and attaches to containers for a service.
```

> NOTE: If you change a service's `Dockerfile` or the contents of its build directory, you can run `docker-compose build` to rebuild it.

## Deploy
* Download and install the Heroku Toolbelt
* In terminal, run the folllwoing (One time setup):
```sh
  # Login with your Heroku credentials:
  heroku login

  # Navigate to the app directory and create a heroku app:
  cd address-book-api
  heroku create address-book-api

  # Set up the mLab add-on and configure the MONGODB_URI environment variable:
  heroku addons:create mongolab

  # Push the code to heroku:
  git push heroku master
```
> NOTE: You will also need to set the necessary environment variables (see `.env.example`) by running `heroku config:set KEY=VALUE`.

For all subsequent deployments just do a push and heroku will automatically do the rest for you:
```
  git push heroku master
```

## Documentation
* API documentation can be found under `/docs/index.html`
* Regenarate the documentation by updating the API comments in the code and running:
```sh
  npm run docs
```
