# Blog Application

## Table of Contents

- [Introduction](#introduction)


---

## Introduction

This project is a Blog Application that allows users to create, update, like, and comment on blogs. It consists of three microservices:

1. **User Service**: Manages user-related functionality.
2. **Blog Service**: Handles blog-related functionality.
3. **Comment Service**: Allows commenting on blogs.

The backend is built using **Node.js**, **Express**, and **MongoDB** as the database. The application is containerized using **Docker** for ease of deployment. The app is deployed to **AWS** using EC2 instances and Docker Mongo.

---

## Prerequisites

Before starting, ensure that you have the following installed:

- **Docker** and **Docker Compose**: To run the application in containers.
- **Git**: For cloning the repository.

---


### Build and Run Locally using Docker Compose

Follow these steps to run the application locally using **Docker Compose**.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saikrishna-1611/Multiserver_BlogApi.git
   cd Multi
2. ***Login to docker in your terminal***

   docker login -u <username> -p <password>
   
3 .**Build the Docker Container**

    docker-compose build
    
4 .**Start the Serviced**
    docker-compose up
5 .**Access the services**
   
	•	User Service: http://localhost:4000
	•	Blog Service: http://localhost:5001
	•	Comment Service: http://localhost:6000
	•	MongoDB: mongodb://localhost:27017

6 .**To stop Running Services**
   docker-compose down

**OPEN POSTMAN**
   **USER-SERVICE routes**
   
        router.post('/register', register);
        router.post('/login', login);
        router.delete('/deleteblogbyid/:id', authUser, deleteBlog);  //id of blog
        router.get('/getallBlogs', authUser, getBlogs);
        router.delete('/deleteall',authUser, deleteAll);
        router.put('/updateblogbyid/:id',authUser,updateBlog);  //id of blog

  **BLOG-SERVICE routes**
  
       router.post('/', createBlog);
       router.get('/', getAllBlogs);
       router.get('/:id', getBlogById);    //id of blog
       router.put('/:id',updateBlog);    //id of blog
       router.post('/like/:_id',likeBlog);    //id of blog
  **COMMENT-SERVICE routes**
  
      router.post('/', addComment);
      router.get('/', getCommentsByPost); 
We can view the Database in MONGODB compass at localhost:27017
