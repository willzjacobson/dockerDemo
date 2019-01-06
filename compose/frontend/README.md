# Summary
<Service Name Here>


## Built With
* [React](https://reactjs.org/docs/hello-world.html) - Javascript Framework
* [Redux](https://redux.js.org/) - State Mgmt Container
* [Axios](https://www.npmjs.com/package/axios) - Ajax Requests
* [Typescript](http://www.typescriptlang.org/) - Type enforcement
* [Webpack](https://webpack.js.org/) - Code Bundler & Task Runner
* [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react) - Easy to use, light-weight icons


# Install
Run: `npm install`


# Run
We have the option of running in either development mode or production mode.

In development mode we have 2 servers running: the NodeJS server serving the backend, and webpack dev server serving the front end code (this provides hot reloading). The Node server uses nodemon, which automatically restarts the server any time server side code changes.
There is no server rendering in dev mode.

In production mode we have only the node server running. The client side code is bundled into static files using webpack, and is served by the NodeJS server.

To start the service in development mode, run: `npm run dev` or `yarn dev`
To start the service in production mode, run: `yarn start` or `npm start`


# Use
If running in production mode, direct your browser to  `localhost:3000`
If running in production mode, direct your browser to `localhost:8080`


# Deploy
This service is deployed using docker. The Dockerfile is included. 
The deployment process is yet to be formalized :)
