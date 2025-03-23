-- DATABASE creation and table creation for user_access
CREATE DATABASE user_access;

-- Select the database
USE user_access;

-- Tabale creation for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- Primary key
    firstname VARCHAR(100) NOT NULL,        -- user first name 
    lastname VARCHAR(100) NOT NULL,         -- user last name
    email VARCHAR(255) UNIQUE NOT NULL,     -- user email (unique)
    password VARCHAR(255) NOT NULL,         -- password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- creation date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- update date
);

-- insert data into users table
INSERT INTO users (firstname, lastname, email, password) 
VALUES ( ('Ishma' 'Grg', 'ishma@example.com', 'password123');  
INSERT INTO users (firstname, lastname, email, password) 
VALUES ('Priscila', 'Dias', 'priscila@example', 'password123');  
INSERT INTO users (firstname, lastname, email, password) 
VALUES ('Maftuna', 'A', 'maftuna@example.com', 'password123');  
INSERT INTO users (firstname, lastname, email, password) 
VALUES ('Hanna', 'A', 'hanna@example.com', 'password123');  

-- DATABASE creation and table creation for user_details
CREATE DATABASE user_details;

-- Select the database
USE user_details;

-- Table creation for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- pr
    first_name VARCHAR(100) NOT NULL,       -- user first name
    last_name VARCHAR(100) NOT NULL,        -- user last name
    profile_picture VARCHAR(255) NOT NULL,  -- user profile picture
    outfits_available INT NOT NULL,         -- number of outfits available
    tags VARCHAR(255) NOT NULL,             -- Tags associated with the user
    description TEXT NOT NULL,              -- DESCRIPTION
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- creation date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- update date
);

-- insert data into users table
INSERT INTO users (first_name, last_name, profile_picture, outfits_available, tags, description) 
VALUES 
    ('Ishma', 'Grg', '/images/user1.jpg', 5, 'Wedding', 'Ishma loves sharing outfits for special occasions like weddings.'),
    ('Priscila', 'Dias', '/images/user2.jpg', 3, 'Birthday Party', 'Priscila enjoys styling outfits for various birthday parties.'),
    ('Maftuna', 'A.', '/images/user3.jpg', 4, 'Job Interviews', 'Maftuna specializes in outfits for job interviews, aiming for professional looks.'),
    ('Hanna', 'A.', '/images/user4.jpg', 4, 'Date Nights', 'Hanna shares outfits perfect for romantic date nights.');

-- Database creation and table creation for outfits_store
CREATE DATABASE outfits_store;

-- Select the database
USE outfits_store;

-- Table creation for outfits
CREATE TABLE outfits (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único do outfit
    name VARCHAR(255) NOT NULL,               -- Nome do item
    category VARCHAR(50) NOT NULL,            -- Categoria (e.g., Women, Men, Kids)
    size VARCHAR(10) NOT NULL,                -- Tamanho (e.g., XS, S, M, L, XL)
    price DECIMAL(10, 2) NOT NULL,            -- Preço do item
    image_url VARCHAR(255) NOT NULL,          -- Caminho da imagem do item
    occasion VARCHAR(50) NOT NULL,            -- Ocasião (e.g., Job Interview, Wedding)
    is_saved BOOLEAN DEFAULT FALSE,           -- Indica se o item foi salvo nos favoritos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação do item
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização
);

-- Insert data into outfits table
INSERT INTO outfits (name, category, size, price, image_url, occasion, is_saved) 
VALUES 
    ('Birthday Party Outfit', 'kids', 'S', 20.00, '/images/kids.webp', 'Birthday Party', FALSE),
    ('Wedding Dress', 'women', 'M', 100.00, '/images/wedding.jpg', 'Wedding', FALSE),
    ('Kids Skirt', 'kids', 'S', 12.00, '/images/kidschool.jpg', 'School Events', FALSE),
    ('One Piece Dress', 'women', 'L', 22.56, '/images/date.jpg', 'Date Night', FALSE),
    ('Double Fitted Blazer', 'men', 'M', 45.98, '/images/job1.jpg', 'Job Interviews', FALSE),
    ('Black Formal Pant', 'men', 'L', 32.10, '/images/pant.jpg', 'Job Interviews', FALSE),
    ('Long Sleeve Mini Dress', 'women', 'M', 35.00, '/images/mini.jpg', 'Date Night', FALSE),
    ('Kids Top', 'kids', 'S', 20.00, '/images/kid2.jpg', 'School Events', FALSE);

    -- Database creation and table creation for fashion_icon
CREATE DATABASE fashion_icon;

-- Select the database
USE fashion_icon;

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,           -- e.g., Women, Men, Kids
    size VARCHAR(10) NOT NULL,               -- e.g., XS, S, M, L, XL
    condition VARCHAR(50) NOT NULL,          -- e.g., New, Like New, Gently Used, Worn
    price DECIMAL(10, 2) DEFAULT NULL,       -- Only for items that are for sale
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,         -- Image URL
    occasion VARCHAR(50) NOT NULL,           -- e.g., Job Interviews, Wedding, Birthday Party
    type VARCHAR(50) NOT NULL,               -- e.g., donate, share, sell
    user_id INT,                             -- User ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password) 
VALUES 
    ('Ishma Grg', 'ishma@example.com', 'password123'),
    ('Priscila Dias', 'priscila@example.com', 'password123'),
    ('Maftuna A.', 'maftuna@example.com', 'password123'),
    ('Hanna A.', 'hanna@example.com', 'password123');

    INSERT INTO items (name, category, size, condition, price, description, image_url, occasion, type, user_id) 
VALUES 
    ('Wedding Dress', 'women', 'M', 'New', 100.00, 'Elegant wedding dress for your special day.', '/images/wedding.jpg', 'Wedding', 'sell', 1),
    ('Birthday Party Dress', 'kids', 'S', 'Gently Used', NULL, 'Cute dress perfect for birthday parties.', '/images/kids.webp', 'Birthday Party', 'donate', 2),
    ('Blazer for Job Interviews', 'men', 'L', 'Like New', 45.98, 'Stylish double-fitted blazer for interviews.', '/images/job1.jpg', 'Job Interviews', 'sell', 3),
    ('Casual Dress for Date Night', 'women', 'M', 'Worn', 22.56, 'Perfect for casual date nights.', '/images/date.jpg', 'Date Night', 'share', 4);



