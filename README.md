# cs3305-team-software-project - Group 7
CS3305 - Team 7 Software Project

## 
## Live App
The live app can be found at https://project-970041699397464178.web.app/

## Current Branch Details
### Release
This branch contains the beta release version of the app

### Main
The main branch contains only finished code, and currently holds the beta release, along with newer changes that have been added since release. Features pushed here have been approved during a team meeting and any new code has been tested within the current state of the main branch before being committed.


## Running the app locally
### Cloning
First clone the git repo with:
```
git clone https://github.com/FinbarrShiels/cs3305-team-software-project.git team-software-project-group-7
```
### Switching to the current repo
For now, if you want to see the current progress with the frontend of the app, you must checkout to the *'release'* branch of the git repo. 
In order to swap to the correct branch:
```
git checkout release
```

In order to run the app on a local server we have been using a node live server.
To install npm run the following command within the repos parent directory (team-software-project-group-7 by default if you used the given command to clone the repo):
```
npm install
``` 

Once npm is installed run:
```
npm start
```
A new tab should open in your browser with the app running.

## Deploying with Firebase
Using Firebase allows for for the live hosting of the web app.

However, some additional configuring is required for users outside the development team.

First install firebase and firebase-tools from the project root.
```
npm install firebase
npm install -g firebase-tools
```
After successful installation, login to firebase to register the local app with a firebase app. 

For dev team members, the current project will be automatically be associated with their account and made available after login, however outside users will need to create a Firebase project on the Firebase console and register that with the local app. 
```
firebase login
```
To begin deploying, initialise the project root as a firebase project.
``` 
firebase init
```
Follow the prompts in terminal, installing only firestore and hosting, registering the local app as specified earler depending on the user.

To build the app for deployment, first edit `PROJECT_ROOT/firebase.json` and find the hosting rules.
```
"hosting" {
  "public": "public",
```
and change to 
```
"hosting" {
  "public": "build",
```

For outside users, the variable `firebaseConfig` in `PROJECT_ROOT/src/firebaseFunctions/auth.js` must be edited to allow deployment of the local app to the relevant users Firebase app space.
```
const firebaseConfig = {
  apiKey: USER_API_KEY,
  authDomain: USER_DOMAIN,
  projectId: USER_PROJECT_ID,
  storageBucket: USER_STORAGE_BUCKET,
  messagingSenderId: USER_ID,
  appId: USER_APP_ID
}
```
This can be found within project settings on the Firebase console.
This can be found at https://console.firebase.google.com/u/"USER"/project/"USER_PROJECT_ID"/settings/general/

Then build with
```
npm run build
```
Finally, deploy with
```
firebase deploy
```
The link to the app will be displayed in terminal after successful deployment.

### Dependencies
For routing and the use of prebuilt components, react-router-dom and react-mdl are used. If you get an error when trying to view the page via the live server, installing these two dependencies should fix any of these errors.
To install these run:
```
npm install react-router-dom
```
And:
```
npm install react-mdl
```
