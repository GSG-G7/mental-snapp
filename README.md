# Mental Snapp
[![Netlify Status](https://api.netlify.com/api/v1/badges/8694ae19-34b4-48ed-b326-5f073d9a7608/deploy-status)](https://app.netlify.com/sites/mental-snapp/deploys)

###### tags:`Mental-Snapp` `Web App` `Startup`

### Summary :pencil:
Mental Snapp is a mobile-first web application which allows people in general and women in particular to write down about their feelings or life through answering a set of questions.

### Challenge :warning:
Users need a way to connect to their feelings so that they can accept themselves and feel confident that they can manage their lives.

### Solution :bulb: 
Mental Snapp supports users in developing an active self awareness so that they can reframe negative moods into positive ones and as a result they can move from victims to someones who are in control.

### Our App Figma Design: 
Here where you can find [Our Figma Prototype](https://www.figma.com/proto/NdSdcFUdpgpUSoY5Tah1f9/My-Mental-Health-Story?node-id=125%3A70&scaling=min-zoom)
<img src="./src/containers/assets/images/figma-design.png" alt="figma design photo" />

### User Stories :books:
<em>"As a user I want to be able to ...:"</em>

- [x] Create a new account or sign in by Google account.

- [x] Keep track of my main goal by seeing it on the top of the main page.

- [x] Edit my main goal by clicking on the edit icon next to it. 

- [x] Add a journal by clicking on the plus button (+).

- [x] Skip any question without entering any answer by clicking on the skip button.

- [x] Cancel adding journal by clicking on the exit button (x).

- [x] Delete a journal by clicking on the delete button inside the journal card.

- [x] See the timestamp which indicates when the user adds the journal inside journal card.

- [x] See the details of the journal card by clicking on the card itself

- [x] Track activity of the current day and month by clicking on the calendar icon.

- [x] See the journals of a specific day on the heatmap by clicking on a specific place for the day from the graph.

- [x] See journals of previous months by clicking on the list icon.

- [x] See the journals of a specific month by choosing it from the drop-down menu in the top page

- [x] See my account information from the setting page by clicking on the settings icon

- [x] Edit my account information by clicking on the edit button from the setting page.

### The MVP! :sparkles:
####  Look at this short video that shows the functionality of the app:

![Demo](https://i.imgur.com/f944Q7C.gif)

### The App Setup :question:
#### Set up the app locally
First clone this repo: git clone https://github.com/GSG-G7/mental-snapp.git

then run npm i to install the dependencies for the app.

#### Environment Variables
Environment variables are where we store our firebase configuration.

Create a .env file and add the following variables:
```
  REACT_APP_API_KEY
  REACT_APP_AUTH_DOMAIN
  REACT_APP_DATABASE_URL
  REACT_APP_PROJECT_ID
  REACT_APP_STORAGE_BUCKET
  REACT_APP_MESSAGING_SENDER_ID
  REACT_APP_APP_ID
  REACT_APP_MEASURMENT_ID
  ```

  #### Look [here](https://github.com/GSG-G7/mental-snapp/issues/134) to get more info about how we store the database using firebase, and to get the project configuration which you can put in the . env file.
  
  #### Run the App
You can now start the app! In your terminal write:
```
npm start
```


### To Be Continued ... :star2:
#### The Stretch Goals:
 - [ ]   Track and display number of days in row on heatmap page
-  [ ] Let the user identify different emotions in themselves so that they are better able to write/talk about them
- [ ] Ability to edit past entries
#### The Second Phase:
- [ ] Connect the users with therapists in order to help them

### Technologies :computer:
Core | other |
-------| --------|
HTML | eslint|
CSS | nodemon|
antd| axios|
React| |
Firebase ||

### Team Members
- [Yousuf Al-Najjar](https://github.com/yosefalnajjarofficial)
- [Alaa Taima](https://github.com/AlaaTaima)
- [Fares Al-Hello](https://github.com/fares98)
- [Alaa Yasin](https://github.com/alaa-yasin)


