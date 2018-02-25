/* All of the Firebase Authenticaions is done here */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInRegular(email, password) {

    // This function is used to signin the user using just email and password

    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginEmailPassword(email, password) {

    // This functions is used to authenticate the user using their email and password.
    
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  authenticateWithGoogle() {

    // This function is used to authenticate the user using their Google Account 

    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  authenticateWithFacebook() {

    // This function is used to authenticate the user using their Facebook Acccount.

    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  authenticateWithGithub() {

    // This function is used to authenticate the user using thier Github Account.

    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    );
  }


  authenticateWithTwitter() {

    //This function is used to authenticate the user using theri Twitter Acccount.

    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  setUserDefaultProfile(name) {

      // This function is used to set the name and a default profile pic for the user
      // when they signup using email and password.

    const user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: name,
      photoURL: 'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
    });
  }
setUserDefaultProfilePic() {

  const user = firebase.auth().currentUser;
  return user.updateProfile({
    displayName: this.getCurrentUserInfo().displayName,
    photoURL:'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
  });

}
  getCurrentUserInfo() {

      // This function is used to return the current user's info

    const currentUser = firebase.auth().currentUser;
    return currentUser;
  }

  isLoggedIn() {

    // This function returns a boolean if the user is looged in or logged out

    if (this.userDetails == null ) {
        console.log('User is not logged in');
        return false;
      } else {
        console.log('User is logged in');
        return true;
      }
    }

    logout() {

      // This fucnction is used to logout the user.

      return this._firebaseAuth.auth.signOut();
    }

  
  }

