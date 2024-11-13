<h1 align="center">gigshare</h1>

gigshare is an application which helps artists and fans spread word of upcoming underground shows.

[View Here](https://gigshare-breakable-toy-d3d5ed3d577f.herokuapp.com/)

<img align="center" src="https://github.com/dgazzola/gigshare/blob/main/images/gigshare-screenshot.png" width="400" alt="gigshare homepage display."/>

## Features: 

  - From homepage, user can click "See Gigs" to view all upcoming gigs.

  - Click on a gig tile to see more information about the individual gig.
    * Favorite or unfavorite a gig if user is signed-in.
    * See gig's full lineup.
    * See gig's location displayed on Google Maps via Google Maps API.
    * Can edit/delete gig if current user created the gig.

  - Click on an artist tile to see more information about the individual artist.
    * See artist's name and genre.
    * Automatically plays media selected by the artist.
    * Displays list of upcoming gigs.
    * Can edit/delete artist if current user created the artist profile.

  - Click "My Profile" from top bar to view information abut user's profile
    * Displays username, email, and date the user was created.
    * Lists favorited gigs and gigs that are being hosted by current user.
    * Can register an artist to the user account.
    * Can register a new gig.
  
## To set up locally:

  - Clone the repository

  - Set up your .env based on .env.example. This will require an API key from [Google Maps](https://developers.google.com/maps).

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
