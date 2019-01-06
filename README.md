# Book-A-Beach-House
Developed a web application for travelers to book beach houses and house owners to post beach houses. 
In order to understand performance and scalability, developed the website using three different tech stack

## React + Node  + MySQL
- It was a simple single page application. 
- The front-end had various parent and child components which reduced the redundancy. 
- Rest-API call was made from front-end react server to back-end node server. 
- The user sessions were maintained using express-sessions.
- The node server was connected to the MySQL database.

## React + Redux +Node + Passport + Kafka + MongoDB
- The new development in the project was adding Redux state management middle-ware solving the
   state transfer problem between parent and child components. 
- The other important development was to add passport authentication mechanism using JSON Web 
  Token (JWT) strategy thus making application secure and decentralized at the same time. 
- Leveraged Kafka to manage the communication between client and server. This required the 
  application to be divided into services which had unique topics assigned to them. 
- Lastly, replaced the MySQL database with MongoDB to enhance scalability. Deployed this application 
  on Amazon cloud using 2 EC2 instances.

## React + Redux + Node + Passport + GraphQL +MongoDB
- The new development in this tech stack was removing Kafka and using GrapQL instead of Restful 
   API's. 
- The major learning was expedited product iteration on the front end. Also, learned to eliminate 
   under-fetching and over-fetching across different application API calls.
