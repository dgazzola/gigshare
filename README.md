<h1 align="center">gigshare</h1>

gigshare is an application which helps artists and fans spread word of upcoming underground shows.

[View Here](https://gigshare.herokuapp.com/)

<img src="" width="400" alt="gigshare homepage display."/>

## Features: 

  - View gigs

  - 

    * 
    * 
  
## To set up locally:

  - Clone the repository

  - Set up your .env based on .env.example. This will require an API key from [Google Maps](https://developers.google.com/maps)

  - Run `yarn install`

  - Run `createdb gigshare_development`

  - Navigate to the server folder and run:

    * `yarn migrate:latest`

    * `yarn db:seed`

  - Navigate to the app root directory and run `yarn dev`

  - Go to `localhost:3000` in a browser to view the application

## Creator:

Daniel Gazzola

## Technologies: 

Front End: ReactJS, Sass/CSS, Foundation, HTML

Back End: NodeJS, Express, Objection, Knex
