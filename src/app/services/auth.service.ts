import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

const AUTH0_CLIENT_ID = 'WxxgnCdmVO2URnZB0qRrwQr9xDLhvVj0';
const AUTH0_DOMAIN = 'riacarmin.auth0.com';
const AUTH_OPTIONS = {
  theme: {
    logo: 'https://dl.dropboxusercontent.com/u/108453220/Quee/logo.png',
    primaryColor: '#48c9b0'
  },
  additionalSignUpFields: [
  {
    name: 'full_name',
    placeholder: 'ex. Ria Carmin',
    // icon: "https://example.com/assests/address_icon.png",
  }]
};

// this is the key to the JWT in the browser localStorage
const ID_TOKEN = 'id_token';

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH_OPTIONS);
  userProfile: Object;

  constructor() {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    // listening to 'authenticated' events
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem(ID_TOKEN, authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  signIn() { this.lock.show(); }

  signOut() {
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  }

  authenticated() { return tokenNotExpired(); }
}
