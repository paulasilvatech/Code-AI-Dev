-- Workshop Database Initialization Script
-- Creates tables and sample data for security exercises

-- Create Users table for SQL injection exercises
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    created_date DATETIME2 DEFAULT GETDATE(),
    last_login DATETIME2 NULL,
    is_active BIT DEFAULT 1
);

-- Create sensitive_data table for security testing
CREATE TABLE sensitive_data (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(id),
    credit_card NVARCHAR(20),
    ssn NVARCHAR(12),
    phone NVARCHAR(15),
    address NVARCHAR(255)
);

-- Insert sample data for testing
INSERT INTO users (username, email, password_hash) VALUES
('alice.johnson', 'alice.johnson@example.com', 'hashed_password_1'),
('bob.smith', 'bob.smith@example.com', 'hashed_password_2'),
('charlie.brown', 'charlie.brown@example.com', 'hashed_password_3'),
('diana.prince', 'diana.prince@example.com', 'hashed_password_4'),
('eve.wilson', 'eve.wilson@example.com', 'hashed_password_5');

-- Insert sample sensitive data
INSERT INTO sensitive_data (user_id, credit_card, ssn, phone, address) VALUES
(1, '1234-5678-9012-3456', '123-45-6789', '555-0101', '123 Main St, Anytown USA'),
(2, '2345-6789-0123-4567', '234-56-7890', '555-0102', '456 Oak Ave, Somewhere USA'),
(3, '3456-7890-1234-5678', '345-67-8901', '555-0103', '789 Pine Rd, Elsewhere USA'),
(4, '4567-8901-2345-6789', '456-78-9012', '555-0104', '321 Elm St, Nowhere USA'),
(5, '5678-9012-3456-7890', '567-89-0123', '555-0105', '654 Maple Dr, Anywhere USA');

-- Create stored procedures for advanced exercises
CREATE PROCEDURE GetUserByUsername
    @Username NVARCHAR(50)
AS
BEGIN
    SELECT id, username, email, created_date, last_login, is_active
    FROM users
    WHERE username = @Username AND is_active = 1;
END;

CREATE PROCEDURE ValidateUser
    @Username NVARCHAR(50),
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    SELECT COUNT(*) as IsValid
    FROM users
    WHERE username = @Username 
    AND password_hash = @PasswordHash 
    AND is_active = 1;
END;

-- Create indexes for performance exercises
CREATE INDEX IX_users_username ON users(username);
CREATE INDEX IX_users_email ON users(email);
CREATE INDEX IX_users_created_date ON users(created_date);

PRINT 'Workshop database schema created successfully!';
