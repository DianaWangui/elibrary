-- Create the database
CREATE DATABASE IF NOT EXISTS elibrarydb;

-- Select the database
USE elibrarydb;

-- Create a user with a secure password
CREATE USER 'elibrary' @'localhost' IDENTIFIED BY 'elibrary';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON elibrarydb.* TO 'elibrary' @'localhost';

-- Apply changes
FLUSH PRIVILEGES;

ALTER USER 'elibrary' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'elibrary';