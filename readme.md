<h1>TDD-express-mongodb</h1>
<h2>About</h2>

<p>This is a chat API, you can create your account, create your rooms and join other rooms, this application it is a chat real-time. 
  Usability is very easy because the low quantity of endpoints and fast communicantion in real time. This application was created with the aim of create a simple connection between users.</p>
  
  <h2>Endpoints</h2>
  
Endpoint | HTTP Methods
---------|------------
/users | POST, GET
/users/:id | PUT, GET, DELETE
/rooms | GET, POST
/rooms/:id | GET, PUT, DELETE
/rooms/:id/members | GET, POST
/rooms/:id/members/:id | GET, PUT, DELETE

<strong>Websockets  Client-Events:</strong>
* send-message
* recive-message

<hr>

<strong>Technologies:</strong>
* Nodejs
* Typescript
* Mongodb
* Docker
* S3 - service
* SES - service
