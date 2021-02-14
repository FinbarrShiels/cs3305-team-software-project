# cs3305-team-software-project - Group 7
CS3305 - Team 7 Software Project

## 

## Current Branch Details
### Main
The main branch is where we intend to push working and finished code. Features pushed here should be approved during a team meeting and any new code should be tested within the current state of the main branch before being committed.

### initialLayout
This branch is where we are working on the main frontend layout. The visuals of each page/view is currently being designed and implemented. Each new page/view is designed in figma (Jack), implemented in react (Luke), styled with CSS (Finbarr).

## Running the app locally
### Cloning
First clone the git repo with:
```
git clone https://github.com/FinbarrShiels/cs3305-team-software-project.git team-software-project-group-7
```
### Switching to the current repo
For now, if you want to see the current progress with the frontend of the app, you must checkout to the *'initialLayout'* branch of the git repo. 
In order to swap to the correct branch:
```
git checkout initialLayout
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

First install firebase and firebase-tools from the project root.
```
npm install firebase
npm install -g firebase-tools
```
After successful installation, login to firebase to register the local app with a firebase app
```
firebase login
```
To begin deploying, initialise the project root as a firebase project.
``` 
firebase init
```
Follow the prompts in terminal, installing only firestore and hosting, registering the local app with a new or existing firebase app.

To build the app for deployment, first edit `PROJECT_ROOT/firebase.json` and find the hosting rules.
```json
"hosting" {
  "public": "public",
```
and change to 
```json
"hosting" {
  "public": "build",
```
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
