# UwU

## Setup

In our repository we have two .env.example files in the frontend and backend folders. We will be using them as the template for our .env files.

### Backend
This is what .env.example looks like in the backend folder:
```
DATABASE=<SOMETHING TO STORE STUFF>
BASENAME=<SOMETHING TO GET ASSETS STUFF>
EXPIRES_IN=<SOMETHING FOR JWT EXPIRATION STUFF>
SECRET=<SOMETHING FOR JWT STUFF>
STATIC=<SOMETHING TO STORE STUFF>
SOCKET=<SOMETHING PORT TO RUN SOCKET STUFF>
PORT=<SOMETHING TO RUN STUFF>
```
This is what the .env file should look like:
```
DATABASE=mongodb://127.0.0.1:27017/c09
BASENAME=http://localhost:3001/
EXPIRES_IN=6400
SECRET=lolcakes
STATIC=uploads
SOCKET=3002
PORT=3001
```
Then run `npm install` and `npm start`
### Frontend

This is what .env.example looks like in the frontend folder
```
REACT_APP_GRAPHQL=http://localhost:3001/graphql
REACT_APP_SOCKET=http://localhost:3002/
```
Create a .env and copy the contents of .env.example
Then run `npm install` and `npm start`

## Socket.io

One of the many technologies we used in is socket.io for the livestreaming service.
We have created the following events to implement it:
- PEER_RELAY: is to share the peer info for the handshake
- UPDATE_LAYER: is for when the viewer adds a new 
- START_PEER: is to start the peer handshake
- END_STREAM: ends the stream
- GET_INFO: gets the stream information
- LEAVE: is to for when a user is leaving the stream and then update the stream info
- JOIN: is for when a new user decides to join the livestream

## User Guide


