# Phonebook Full-stack Application

A simple phonebook application built with React on the front-end and Express.js on the back-end.

Demo: http://193.169.188.226/

## Navigation

- [Phonebook Full-stack Application](#phonebook-full-stack-application)
  - [Navigation](#navigation)
  - [Features](#features)
  - [Installation](#installation)
    - [Requirements](#requirements)
    - [Steps](#steps)
    - [Front-end Installation](#front-end-installation)
    - [Back-end Installation](#back-end-installation)
    - [Running the App](#running-the-app)
    - [Technologies](#technologies)
    - [Screenshots](#screenshots)

## Features

- **Front-end**: The front-end is designed using React and allows users to manage their contacts.
- **Back-end**: Express.js API for handling CRUD operations with contacts.

## Installation

### Requirements

Ensure you have the following installed on your system:

- Node.js

- npm or yarn

### Steps

**Clone the repository**:

```bash
git clone https://github.com/Kolm-dev/phonebook-app.git
```

### Front-end Installation

```console
cd phonebook-app/front-end
```

Install dependencies:

```console
npm install
```

### Back-end Installation

In the back-end directory:

```console
cd phonebook-app/server
```

Install dependencies:

```console
npm install
```

### Running the App

**Front-end**

In the front-end directory

_For development mode_

```console
npm run dev
```

_Build the application_

```console
npm run build
```

**Back-end**

In the server directory:

_For development mode_

```console
npm run dev
```

_Run the server:_

```console
npm run run
```

## Production Settings

### Backend

To ensure the proper functioning of the application in production, you need to update the CORS settings on the back-end to allow connections from the front-end.

**Steps**:
1. Open the configuration file of your back-end server (e.g., `server.js` or `app.js`).
2. Locate the CORS settings and update them by specifying the domain of your front-end. Example:
   ```javascript
   const corsOptions = {
     origin: 'http://your-frontend-domain.com',
     optionsSuccessStatus: 200
   };

   app.use(cors(corsOptions));


### Frontend
You need to update the backend server's URL in your front-end code by replacing all occurrences of localhost with the actual server address.

**Steps**:

1. Open the bundled file of your front-end application (e.g., index654214.js).

2. Use the sed command to replace all occurrences of the local host with your server's address. Example command in cmd-line:
```sed -i 's/localhost:3000/your-backend-server-address.com/g' /path/to/your/builded_index.js```




#### Important Notes
Always verify the correctness of the URL and the availability of the server before applying these changes.
Ensure that the ports required for communication between the front-end and back-end are open and accessible.
After making the changes, restart the servers and thoroughly test the application to ensure its proper functioning.



### Technologies

Front-end:

- React
- KY (HTTP client)
- Vite
- TypeScript
- SCSS

Back-end:

- Express.js
- TypeScript
- CORS (middleware to enable CORS requests)

### Screenshots

P.S.: Screenshots from the mobile version

![alt](https://i.ibb.co/wQpjmbt/localhost-5173-i-Phone-SE.png "contacts list")

![alt](https://i.ibb.co/n8MdnRD/localhost-5173-i-Phone-SE-1.png "form find contact")
