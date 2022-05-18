# Project Overview
###### The Project is built on React, Firebase for storing the data of the users. The data is stored on the firebase database and the images in the firebase storage.

## Functionalities
- User can store name, designation and image.
- Dashborard for viewing the users.
- Search any user based on the words in their name.
- Simple Structure to use with reusable components.

## Install on your System

#### Clone the Project on your local System
 `git clone https://github.com/symaticvisuals/brain-mentors-assignment.git`

#### Navigating to the Project
`cd brain-mentors-assignment`

#### Installing the Dependencies
`npm install`  
*make sure you've latest npm bersion installed on your machine*

#### Edit Configuration in the firebase-config.js
   ###### Replace the array with your configuration.
```
const firebaseConfig = {
  apiKey: "<Auth-Key>",
  authDomain: "<Auth-Domain>",
  projectId: "<Project ID>",
  storageBucket: "<Storage-Bucket>",
  messagingSenderId: "<Message-sender-ID>",
  appId: "<App-ID>",
};
```

#### Running the Project on the Localhost
`npm run start`

