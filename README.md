# Crud Application

## Technologies
**Frontend:** React, React-router, axios, MUI (Buttons) \
**Backend:** NodeJS, express, MySQL, ByCrypt, JWT

On the frontend we have 3 diffrent routes: 
- Login page
- Dashboard with all users list (*admins also will have add new user form)
- User profile page to edit or delete (*only available for admins)

On the backend we have a server with express and crud apis. \
Passwords are encrypted with brypt library. \
Token generated with jwt library. \
Database built with MySql, using 1 users_tb table with the following schema:
 ```
 CREATE TABLE users_tb (
	id int not null AUTO_INCREMENT,
    first_name CHAR(255) not null,
    last_name CHAR(255) not null,
    password CHAR(255) not null,
    email CHAR(255) not null,
    isAdmin boolean not null,
    PRIMARY KEY (id)
);
```
