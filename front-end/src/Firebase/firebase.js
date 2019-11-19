import app from "firebase/app";
import 'firebase/database'
import 'firebase/auth';

const config = {
    apiKey: "KEY",
    authDomain: "DOMAIN",
    databaseURL: "URL",
    projectId: "ID",
    storageBucket: "BUCKET",
    messagingSenderId: "ID",
    appId: "ID"
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.database = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
}

export default Firebase;