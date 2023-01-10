# Eugenia invitations

### App for manage Eugenia's invitations with QR code and authentication.

#### To run this app do you need the next tools:

1. Node.js installed.
2. A MySQL instance running where to create the database.

#### Running the application

The application is a monorepo, which means the backend and frontend are in the same folder.
We can run the app following the next steps:

1. Enter in the root folder, and run: `npm install` this will install al project dependencies.
2. Once dependencies are installed we need to run the command: `npm run dev` then two command lines will prompt, one command line is for the frontend dev server, and the last terminal is for the backend dev server.
3. Navigate to 'api/src/database/database.sql' and copy all the scripts inside of it, and then run it into your database manager.
4. To make your backend communicate with your database, you need to copy the ".env" file inside the API folder, and remove the ".example" extension, and the you need to fill up all the Environment variables in there.
5. Finally, restart your server and the Environment variables will be applied.

#### List of commands in package.json

1. `npm build:app` starts the build of frontend application with Vite.js.
2. `npm start:app` starts the frontend application in development mode.
3. `npm start:api` starts the backend application in development mode.
4. `npm run dev`, starts both, frontend and backend apps in development mode.
5. `npm start` builds the frontend application and save the statics into the API build folder and then runs the backend in production mode, this is for production Environment.
