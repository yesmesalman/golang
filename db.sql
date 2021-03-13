-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2021 at 12:43 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 'salman', 'saleem', 'salman@yahoo.com', '0192023a7bbd73250516f069df18b500', '1', '2021-03-12 19:57:56', '2021-03-12 19:57:56');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `indication` varchar(250) NOT NULL,
  `status` char(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `product_type` int(11) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `price` decimal(4,0) NOT NULL,
  `resturant` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `product_type`, `status`, `price`, `resturant`, `created_at`, `updated_at`) VALUES
(1, 'Beef Burger', 2, '1', '50', 1, '2021-03-12 20:26:36', '2021-03-12 20:26:36'),
(2, 'Chicken Burger', 2, '1', '40', 2, '2021-03-12 20:27:10', '2021-03-12 20:27:10'),
(3, 'Beef Steak', 2, '1', '100', 3, '2021-03-12 20:27:30', '2021-03-12 20:27:30'),
(4, 'Sticky Baked Chicken Wings', 1, '1', '10', 1, '2021-03-12 20:28:07', '2021-03-12 20:28:07'),
(5, 'Caesar Salad Spears', 1, '1', '8', 3, '2021-03-12 20:28:27', '2021-03-12 20:28:27'),
(6, 'Hogs in a Blanket', 1, '1', '6', 2, '2021-03-12 20:28:54', '2021-03-12 20:28:54'),
(7, 'Coke', 5, '1', '3', 1, '2021-03-12 20:29:54', '2021-03-12 20:29:54'),
(8, 'Pepsi', 5, '1', '3', 2, '2021-03-12 20:29:54', '2021-03-12 20:29:54'),
(9, 'French Fries', 4, '1', '7', 1, '2021-03-12 20:32:05', '2021-03-12 20:32:05'),
(10, 'Roasted Chicken Pieces', 4, '1', '10', 3, '2021-03-12 20:32:05', '2021-03-12 20:32:05'),
(11, 'entrées 1', 3, '1', '15', 1, '2021-03-12 20:34:12', '2021-03-12 20:34:12'),
(12, 'entrées 2', 3, '1', '18', 2, '2021-03-12 20:34:12', '2021-03-12 20:34:12');

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE `product_type` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Appetizer', '1', '2021-03-12 20:21:40', '2021-03-12 20:21:40'),
(2, 'Dish', '1', '2021-03-12 20:21:54', '2021-03-12 20:21:54'),
(3, 'entrées', '1', '2021-03-12 20:22:07', '2021-03-12 20:22:07'),
(4, 'Side Dish', '1', '2021-03-12 20:22:27', '2021-03-12 20:22:27'),
(5, 'Drink', '1', '2021-03-12 20:22:40', '2021-03-12 20:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Heirloom Cafe', '1', '2021-03-12 16:43:31', '2021-03-12 16:43:31'),
(2, 'Lord of the Fries', '1', '2021-03-12 16:43:31', '2021-03-12 16:43:31'),
(3, 'Rich Table', '1', '2021-03-12 16:43:46', '2021-03-12 16:43:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
