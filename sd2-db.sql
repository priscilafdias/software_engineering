-- table creation for login
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique identifier for each user
    email VARCHAR(255) NOT NULL UNIQUE,  -- User email (must be unique)
    password VARCHAR(255) NOT NULL       -- Hashed password
);

INSERT INTO users (email, password) 
VALUES
    ('ishma1@example.com', 'pass47684'),
    ('priscila2@example.com', 'password3t8ty'),
    ('maftuna3@example.com', 'PASS856'),
    ('hanna4@example.com', 'passwor4hj4');


CREATE TABLE register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO register (firstname, lastname, email, password) 
VALUES 
    ('Ishma','Grg', 'ishma@example.com', 'password123'),
    ('Priscila', 'Dias', 'priscila@example.com', 'password123'),
    ('Maftuna', 'A', 'maftuna@example.com', 'password123'),
    ('Hanna', 'A', 'hanna@example.com', 'password123');

-- Table creation for profile
CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,      -- pr
    first_name VARCHAR(100) NOT NULL,       -- user first name
    last_name VARCHAR(100) NOT NULL,        -- user last name
    profile_picture VARCHAR(255) NOT NULL,  -- user profile picture
    outfits_available INT NOT NULL,         -- number of outfits available
    tags VARCHAR(255) NOT NULL,             -- Tags associated with the user
    description TEXT NOT NULL             -- DESCRIPTION
);

-- Outfit table
CREATE TABLE outfits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    size ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO outfits (name, size, price, image, description)
VALUES
    ('Birthday Party Dress', 'S', 20.00, '/images/kids.webp', 'Perfect outfit for kids birthday parties.'),
    ('Wedding Dress', 'L', 100.00, '/images/wedding.jpg', 'Elegant wedding dress for your big day.'),
    ('Kids Skirt', 'S', 12.00, '/images/kidschool.jpg', 'Casual skirt for school events.'),
    ('One Piece Dress', 'XL', 22.56, '/images/date.jpg', 'Stylish and elegant one-piece for date nights.');


-- insert data into users table
INSERT INTO profile (first_name, last_name, profile_picture, outfits_available, tags, description) 
VALUES 
    ('Ishma', 'Grg', '/images/user1.jpg', 5, 'Wedding', 'Ishma loves sharing outfits for special occasions like weddings.'),
    ('Priscila', 'Dias', '/images/user2.jpg', 3, 'Birthday Party', 'Priscila enjoys styling outfits for various birthday parties.'),
    ('Maftuna', 'A.', '/images/user3.jpg', 4, 'Job Interviews', 'Maftuna specializes in outfits for job interviews, aiming for professional looks.'),
    ('Hanna', 'A.', '/images/user4.jpg', 4, 'Date Nights', 'Hanna shares outfits perfect for romantic date nights.');

CREATE TABLE share_outfits (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique identifier for the outfit
    name VARCHAR(255) NOT NULL,               -- Occasion name (previously occasion)
    size VARCHAR(10) NOT NULL,                -- Size (e.g., XS, S, M, L, XL)
    image_url VARCHAR(255) NOT NULL,          -- Image path of the item
    item_condition VARCHAR(50) NOT NULL,      -- Condition (e.g., New, Like New, Used)
    description TEXT NOT NULL                 -- Description of the outfit
);

-- Insert data into share_outfits table
INSERT INTO share_outfits (name, size, image_url, item_condition, description) 
VALUES 
    ('Birthday Party', 'S', '/images/kids.webp', 'New', 'Perfect for a fun birthday celebration.'),
    ('Wedding', 'M', '/images/wedding.jpg', 'New', 'Elegant wedding dress for a special occasion.'),
    ('School Events', 'S', '/images/kidschool.jpg', 'Used', 'Comfortable and stylish skirt for school events.'),
    ('Date Night', 'L', '/images/date.jpg', 'Like New', 'Chic one-piece dress for a romantic date night.'),
    ('Job Interviews', 'M', '/images/job1.jpg', 'New', 'Professional double-fitted blazer for interviews.'),
    ('Job Interviews', 'L', '/images/pant.jpg', 'Used', 'Sleek black formal pants for office or interviews.'),
    ('Date Night', 'M', '/images/mini.jpg', 'Like New', 'Trendy mini dress with long sleeves for a stylish look.'),
    ('School Events', 'S', '/images/kid2.jpg', 'New', 'Cute and comfy top for kids to wear at school events.');

CREATE TABLE upload_outfit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    itemCondition VARCHAR(50) NOT NULL,
    itemSize VARCHAR(50) NOT NULL,
    itemDescription TEXT NOT NULL,
    itemPrice DECIMAL(10,2) DEFAULT 0,
    category VARCHAR(50) NOT NULL,
    imageUrl VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
