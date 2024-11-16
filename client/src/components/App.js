import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./HomePage.js";
import GigsListPage from "./GigsList.js";
import GigShowPage from "./GigShowPage.js";
import NewGigForm from "./NewGigForm.js";
import UserShowPage from "./UserShowPage.js";
import RegisterArtistForm from "./RegisterArtistForm.js";
import ArtistShowPage from "./ArtistShowPage.js";
import { useFavorites } from "../context/FavoritesContext.js";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { fetchFavorites } = useFavorites();
  
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      fetchFavorites(currentUser.id);
    }
  }, [currentUser]);
  
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
            render={(props) => <GigsListPage {...props} currentUser={currentUser} />}
          />
          <Route 
            exact 
            path="/gigs/new-gig-form"
            render={(props) => <NewGigForm {...props} currentUser={currentUser} />}
          />
          <Route 
            exact 
            path="/gigs/:id"
            render={(props) => <GigShowPage {...props} currentUser={currentUser} />}
          />
          <Route
            exact
            path="/users/:id/register-as-artist"
            render={(props) =>
              currentUser ? (
                <RegisterArtistForm {...props} currentUser={currentUser} />
              ) : (
                <Redirect to="/user-sessions/new" />
              )
            }
          />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <Route 
            exact 
            path="/users/:id" 
            render={(props) => <UserShowPage {...props} currentUser={currentUser} />}
          />
          <Route 
            exact 
            path="/artists/:id" 
            render={(props) => <ArtistShowPage {...props} currentUser={currentUser} />}
          />
        </Switch>
      </Router>
  );
};

export default App;
