-- Drop and create database
DROP DATABASE IF EXISTS test_db;
CREATE DATABASE test_db;
USE test_db;
-- Create a simple table with a primary key
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);
-- Create posts table
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Insert one row
INSERT INTO users (name)
VALUES ('John Doe');
INSERT INTO posts (user_id, title)
VALUES (1, 'First Post');
-- Create a view that returns each user's last post id
CREATE VIEW user_post_summary AS
SELECT users.id AS user_id,
    (
        SELECT posts.id
        FROM posts
        WHERE posts.user_id = users.id
        ORDER BY posts.id DESC
        LIMIT 1
    ) AS last_post_id
FROM users;