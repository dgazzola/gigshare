import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./HomePage.js"
import GigsListPage from "./GigsList.js";
import GigShowPage from "./GigShowPage.js";
import NewGigForm from "./NewGigForm.js";
import UserShowPage from "./UserShowPage.js";
import RegisterArtistForm from "./RegisterArtistForm.js";
import ArtistShowPage from "./ArtistShowPage.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route 
          exact 
          path="/gigs"
          render= {(props) => <GigsListPage {...props} currentUser={currentUser}/>}
        />
        <Route exact path="/gigs/new-gig-form">
          <NewGigForm />
        </Route>
        <Route 
          exact 
          path="/gigs/:id"
          render= {(props) => <GigShowPage {...props} currentUser={currentUser}/>}
        />
        <Route 
          exact 
          path="/users/:id/register-as-artist"
          render= {(props) => <RegisterArtistForm {...props} currentUser={currentUser}/>}
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route 
          exact 
          path="/users/:id" 
          render={(props) => <UserShowPage {...props} currentUser={currentUser} />}/>
        <Route 
          exact 
          path="/artists/:id" 
          render={(props) => <ArtistShowPage {...props} currentUser={currentUser} />}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
