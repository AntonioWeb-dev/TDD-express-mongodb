<h1>TDD-express-mongodb</h1>
<h2>About</h2>

<p>This is a chat API, you can create your account, create your rooms and join other rooms, this application it is a chat real-time. 
  Usability it is very easy because the low quantity of endpoints and fast communicantion in real time. This application was created with the aim of create a simple connection between users.</p>
  
  <h2>Endpoints</h2>
  
Endpoint | HTTP Methods
---------|------------
/users | POST, GET
/users/:id | PUT, GET, DELETE
/rooms | GET, POST
/rooms/:id | GET, PUT, DELETE
/rooms/:id/members | GET, POST
/rooms/:id/members/:id | GET, PUT, DELETE

Websockets  Client-Events:
* send-message
* recive-message

<h3>How to connect to chat</h3>
