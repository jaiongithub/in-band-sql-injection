-- Create Database
DROP DATABASE IF EXISTS sql_injection;
CREATE DATABASE sql_injection;
USE sql_injection;

-- Create `products` Table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  abstract TEXT,
  cost DECIMAL(10,2),
  released BOOLEAN,
  category VARCHAR(50)
);

-- Insert Data into `products`
INSERT INTO products (name, abstract, cost, released, category) VALUES
('Wireless Earbuds', 'Noise-cancelling Bluetooth earbuds for all-day comfort.', 2499, 1, 'Electronics'),
('Fitness Band', 'Track your steps, heart rate, and sleep with this compact wearable.', 1999, 1, 'Gifts'),
('Organic Green Tea', 'A premium blend of hand-picked organic green tea leaves.', 349, 1, 'Gifts'),
('Wooden Table Lamp', 'Handcrafted table lamp made from sustainable wood.', 899, 1, 'Gifts'),
('Mini Bluetooth Speaker', 'Pocket-sized speaker with deep bass and clear treble.', 1299, 1, 'Electronics'),
('Artisan Coffee Beans', 'Single-origin Arabica beans roasted to perfection.', 699, 1, 'Gifts'),
('Eco-Friendly Notebook', 'Recycled paper notebook with kraft cover.', 149, 1, 'Gifts'),
('Desk Organizer', 'Multipurpose desk organizer to declutter your workspace.', 399, 1, 'Gifts'),
('Yoga Mat', 'Non-slip, sweat-resistant yoga mat ideal for daily practice.', 999, 1, 'Gifts'),
('Scented Candles Set', 'Set of 4 calming scented soy wax candles.', 599, 1, 'Gifts'),
('Counterfeit Currency Printer', 'High-resolution printer for unauthorized currency replication.', 75000, 0, 'Illegal'),
('Forged Passports', 'Set of 10 forged passports with scannable barcodes.', 120000, 0, 'Illegal'),
('Remote Access Spyware', 'Undetectable spyware for gaining remote control over devices.', 15000, 0, 'Illegal'),
('Untraceable Firearm', '3D-printed firearm without serial number.', 50000, 0, 'Illegal'),
('Illegal Substances Pack', 'Mixed package of banned synthetic drugs.', 2000, 0, 'Illegal');

-- Create `dark_users` Table
CREATE TABLE dark_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(100)
);

-- Insert Data into `dark_users`
INSERT INTO dark_users (username, password) VALUES
('admin', 'admin123'),
('agent_z', 'shadowpass'),
('kingpin', 'blacklotus'),
('ghost_user', 'phantom99'),
('nightcrawler', 'darkstep');

-- Create `dark_users_cards` Table
CREATE TABLE dark_users_cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50),
  real_name VARCHAR(100),
  card_number VARCHAR(30),
  card_pin VARCHAR(10)
);

-- Insert Data into `dark_users_cards`
INSERT INTO dark_users_cards (nickname, real_name, card_number, card_pin) VALUES
('Kingpin', 'Victor Shade', '4539 1488 0343 6467', '9981'),
('SilentGhost', 'Elena Hart', '5299 6400 0000 0007', '1342'),
('CyberPhantom', 'Dmitri Vex', '4024 0071 0000 0007', '2876'),
('DarkSurge', 'Max Holloway', '6011 0009 9013 9424', '5600'),
('Nocturne', 'Sasha Vale', '3714 4963 5398 431', '8854');

-- Create `articles` Table
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200),
  cost DECIMAL(10,2),
  abstract TEXT,
  category VARCHAR(50)
);

-- Insert Data into `articles`
INSERT INTO articles (title, cost, abstract, category) VALUES
('Exploiting SQL Injection in Modern Apps', 1229.99, 'A deep dive into SQLi in today\'s tech stack.', 'Guides'),
('Zero-Day Exploits 2025', 4349, 'Latest collection of real-world zero-day findings.', 'Weapons'),
('Social Engineering Playbook', 1419.50, 'A guide on human-factor exploitation techniques.', 'Guides'),
('Defensive Coding for Beginners', 7625, 'How to write secure code to prevent common attacks.', 'Guides'),
('Dark Web Marketplaces - A Data Study', 35434.75, 'Analysis of product categories in darknet markets.', 'Guides'),
('A Clean Approach for Money Laundering', 3474.25, 'A detailed guide for laundering the scam Money without getting caught.', 'Weapons');
