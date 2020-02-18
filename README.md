# UwU

## Team Members

### Khansa Kiasatina

I am a fourth year student at the University of Toronto Scarborough with a specialist in computer science, software engineering stream. I am currently a teaching assistant for one of the introductory computer science courses at the university and am enjoying it greatly.

Through my previous co-op jobs, I have worked with technology from microservices architecture and Netflix's OSS to web development and single-page applications. After dabbling a bit in both the back-end and front-end sides of software, I realised I prefer developing the front-end of an application due to personal interests in visuals and aesthetics.


### Mason Tang

I am a 4th year Computer Science student, specializing in Software Engineering. I am also in the co-op program and have had two work terms. One of my work terms was at the Ontario Teachers’ Pension Plan in which I maintained and created new tables for their database and created new features to pre-existing projects such as a token manager. I also worked on the authentication process that verifies users' access to our department's applications.


### Frederic Pun

I am a 4th year Co-op Computer Science student, specializing in Software Engineering, who has for the past few years have taken on teaching assistant roles in courses such as Introduction to Software Engineering (CSCC01), and Software Design (CSCB07).

In my free time, my hobbies are rock climbing and contributing to the hacker community such as mentoring and development for hackathons such as Ellehacks, Hack the 6ix, and Hack the Valley.

## Descriptions of web app

UwU (temporary name) is an online video-editing app where you can upload videos, decorate them with filters, stickers, drawings, and share them with your friends! Along with your own videos, you will be able to see other users' creations with their unique edits and share your thoughts by liking and commenting on them.

## Description of key features for Beta Version

 - **User account creation:** Using OAuth
 - **Take video/picture from app:** Users can capture videos and pictures through their camera straight to the app
 - **Ability to create filters, add stickers/text, drawings**
 - **Save drafts of edits:** Users should be able to save their drafts or current progress for later completion
 - **Adding music:** Each video will be allowed to have background audio added to it

## Description of key features for Final Version

 - Follow users, like/comment videos
 - **Geolocation:** Each video will have the geolocation of where it was uploaded at
 - **QR codes:** Users can login to their accounts, share their profiles, invite other users to the website, and link to their videos by scanning a QR code
 - **Web notifications:** Users will receive a notification every time someone they follow posts a new video
 - **2 Factor Authentication:** Users have to use the Google Authenticator app 
 - **Livestream edit video (Biggest feature yet):** Users can collaborate on a video by editing it together in real-time
 - **Video Downloading/Sharing:** Users can save and share their creations to others on other platforms

## Description of Technologies used

 - GraphQL
 - NodeJS
 - Express
 - DigitalOcean (Docker)
 - Mongoose
 - Socket.io
 - Native web APIs
    - Push notifications
    - Audio
    - Video
    - Camera
 - React
 - Google Maps / Radar.io

## Description of top 5 technical challenges

 - **Making a video editor:** The hardest technical challenge will be the video editor itself as it will require lots of components, like uploading a file, adding effect/picture, etc. We also have to consider how we might save these edits as we implement drafts into the system. We also have to be extremely smart with how we implement the editor itself, as it’s a fairly heavy feature.

 - **Having a pseudo video editor in real time:** Implementing a feature that is similar to live streaming will be one of the biggest features and challenges we plan to implement as it would require complex web interaction to allow multiple users in real time to make simple edits to the video.

 - **2 factor authentication:** This is difficult as we would have to include and consider a “external” flow in the authentication process. This process is also not synchronized with the rest of the flow, hence we would have to have some way of storing the authentication state, and revoking it after a period of time

 - **QR code:** This would be difficult as we have to dynamically create and store these QR codes. When users access the QR codes, how would we deal with the response?

 - **Adding music:** The challenge of this is figuring out how to combine the audio snippets with the video into one file so that the end result will be a single video file for the user.
