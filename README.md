# UwU

## Production URLS
 - *Frontend:* [https://theuwu.tech](https://theuwu.tech)
 - *GraphQL API:* [https://api.theuwu.tech](https://api.theuwu.tech)
 - *Socket Server:* [https://live.theuwu.tech](https://live.theuwu.tech)

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
#### MongoDB
Make sure you have mongodb installed and run the following command
`sudo systemctl start mongod`

Then run `npm install` and `npm start`

### Frontend

This is what .env.example looks like in the frontend folder
```
REACT_APP_GRAPHQL=http://localhost:3001/graphql
REACT_APP_SOCKET=http://localhost:3002/
REACT_APP_RADAR=prj_test_pk_b67873cfbe5e751f367fddccb937feb02b635a8a
```
Create a .env and copy the contents of .env.example
Then run `npm install` and `npm start`

## Socket.io

One of the many technologies we used in is socket.io for the livestreaming service.
We have created the following events to implement it:
| Socket Event | Payload | Description |
| --- | --- | --- |
| PEER_RELAY | data | This is used by simple-peer to exchange p2p information. This also comes with a suffix (PEER_RELAY_[PEER_ID]), which is used to help keep this information exchange private |
| UPDATE_LAYER | { type: String, asset: String, text: String, position: { x: float, y: float } } | This (similar to our PostLayer) is used to share layer information to the server for broadcasting |
| START_PEER | undefined | This event is sent from the streamer to the new viewer to let them know that they are ready to initalize a peer connection |
| END_STREAM | undefined | This is sent by the streamer only, which is used to broadcast to everyone to inform them that the stream is over |
| GET_INFO | undefined | This is used to get information about the stream such as your type (STREAMER/VIEWER), the viewers, and your the layers |
| LEAVE | { peer: String, username: String, _id: String } | Used to inform everyone that someone has left the stream |
| JOIN | { peer: String, username: String, _id: String } | Used to inform everyone that someone has joined the stream. This also informs the streamer to prepare for receiving info for a peer connection. When they are ready, they would send them a START_PEER event |

## User Guide

### Register or Login
![Create Account](https://cdn.discordapp.com/attachments/688407732973469799/698973640309604403/unknown.png)<br/>
![Login](https://cdn.discordapp.com/attachments/688407732973469799/698974148075978803/unknown.png)

### Creating a post
![Post](https://cdn.discordapp.com/attachments/688407732973469799/698974772922548224/unknown.png) <br/>
You can then edit the post by clicking on the edit draft button <br/>
![Edit](https://cdn.discordapp.com/attachments/688407732973469799/698975041689223318/unknown.png) <br/>
You can add text, stickers, or filters to the post <br/>
![Stickers](https://cdn.discordapp.com/attachments/688407732973469799/698975933721477140/unknown.png)<br/>
You may then save the post or publish it to be viewed on the homepage like the image below <br/>
![Home](https://cdn.discordapp.com/attachments/688407732973469799/698976146783731823/unknown.png)<br/>
The post will now be able to be shared or downloaded <br/>
![Share](https://cdn.discordapp.com/attachments/688407732973469799/698978892001837076/unknown.png)<br/>

### Livestreaming
#### Streamer
Click the streaming tab, title you stream and start the stream <br/>
![Stream Start](https://cdn.discordapp.com/attachments/688407732973469799/698976472769232987/unknown.png) <br/>
This is what it'll look like to the streamer: <br/>
![Streamer](https://cdn.discordapp.com/attachments/688407732973469799/698976812763447477/unknown.png) <br/>
When the viewer adds a new layer/item it will be reflected on the streamer's window as shown below: <br/>
![Streamer View](https://cdn.discordapp.com/attachments/688407732973469799/698978339720921178/unknown.png) <br/>
#### Viewer
A viewer will see this in the Stream Tab: <br/>
![Viewer](https://cdn.discordapp.com/attachments/688407732973469799/698977258315972628/unknown.png) <br/>
Click the 'Join Stream' button.
The viewer will now be able to add a new layer/item to the livestream as shown below <br/>
![Viewer Add](https://cdn.discordapp.com/attachments/688407732973469799/698977628773941338/unknown.png) <br/>

