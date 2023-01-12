
CREATE DATABASE eugenia;

USE eugenia;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
NAME TEXT
);


CREATE TABLE user(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(200),
lastname VARCHAR (200),
email VARCHAR(200),
password TEXT,
fk_department INT,
FOREIGN KEY (fk_department) REFERENCES department (id));


CREATE TABLE invitation(
id INT PRIMARY KEY AUTO_INCREMENT,
host_name TEXT,
arrival_date TEXT,
expiration_date TEXT,
fk_user_owner INT,
foreign key (fk_user_owner) references user (id)
);


