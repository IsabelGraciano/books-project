# CRUD Books App
This project is a simple CRUD (Create, Read, Update, Delete) Books application, allowing users to manage a list of books. The backend is built with Flask, a Python web framework, while the frontend is developed using Angular. Follow the steps below to run the project locally.

## Prerequisites
Node.js 18 (for the frontend)
Python 3.8 (for the backend)
Docker and Docker Compose

## Getting Started
#### Clone the Repository:
```
git clone https://github.com/IsabelGraciano/books-project.git
cd books-project
```

#### Install Frontend Dependencies:

```
cd frontend
npm install
```
#### Build and Run Docker Compose:

```
cd ..
docker-compose build
docker-compose up
```

The project is now running! You can access the frontend at http://localhost:4200/ and the backend at http://127.0.0.1:4000/.

## Swagger Tests
Explore the API documentation and test the endpoints using Swagger UI:

http://127.0.0.1:4000/swagger
Additionally, you can view Swagger test images located in the project root:

* get.png
* post.png
* put.png
* delete.png

## Postman Tests
Check out Postman tests for the endpoints, available in image format in the project root:

* get-postman.png
* post-postman.png
* put-postman.png
* delete-postman.png


## Screenshots
For a visual representation of Swagger and Postman tests, refer to the following images in the project root.

Swagger Tests:

![](/get.png)
![](/post.png)
![](/put.png)
![](/delete.png)
Postman Tests:

![](/get-postman.png)
![](/post-postman.png)
![](/put-postman.png)
![](/delete-postman.png)


Feel free to explore, contribute, and enhance this CRUD Books App!