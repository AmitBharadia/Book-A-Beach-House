-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 07:02 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `guests` int(11) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `user_id`, `property_id`, `from_date`, `to_date`, `guests`, `isAvailable`) VALUES
(1, 1, 1, '2018-10-09', '2018-10-10', 2, 0),
(2, 7, 1, '2018-10-10', '2018-10-18', 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `property_details`
--

CREATE TABLE `property_details` (
  `id` int(11) NOT NULL,
  `owner_id` varchar(45) NOT NULL,
  `available_from` date DEFAULT NULL,
  `available_to` date DEFAULT NULL,
  `max_guests` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `sqft` int(11) DEFAULT NULL,
  `image_src` varchar(200) DEFAULT NULL,
  `location` varchar(500) DEFAULT NULL,
  `amenities` varchar(500) DEFAULT NULL,
  `headline` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_details`
--

INSERT INTO `property_details` (`id`, `owner_id`, `available_from`, `available_to`, `max_guests`, `price`, `bedrooms`, `bathrooms`, `sqft`, `image_src`, `location`, `amenities`, `headline`, `description`, `type`) VALUES
(1, '3', '2018-10-05', '2019-06-26', 2, 50, 1, 1, 500, 'uploads\\property\\San Jose_Silicon Valley Studio', 'San Jose', NULL, 'Silicon Valley Studio', 'Silicon Valley studio cottage with private entrance. The studio is modern and fitted with a full kitchen, bathroom with shower, queen bed and sleeper sofa. Flat screen TV with cable and free WiFi. Heating and Air Conditioning', 'Apartment'),
(2, '4', '2018-10-03', '2019-06-20', 2, 200, 4, 2, 1000, 'uploads\\property\\San jose_Finished Attic With External Staircase', 'San jose', NULL, 'Finished Attic With External Staircase', 'This finished attic space is about 1000 square feet with no partitions or doors, except for the bathroom. It is roughly divided into three areas by changes in the ceiling. The area furthest from the entrance has a double bed and a well-stocked book case. We recently installed a curtain between this library area and the rest of the space so that the two double beds have at least visual separation. The curtains can be drawn back if you prefer the more open feeling.', 'House'),
(3, '5', '2018-10-03', '2019-06-20', 3, 0, 0, 0, 0, NULL, 'San Francisco', NULL, 'af', '', ''),
(4, '8', '2018-10-03', '2019-03-28', 5, 200, 2, 2, 500, 'uploads\\property\\San Mateo_Beautiful Hose at San Mateo', 'San Mateo', NULL, 'Beautiful Hose at San Mateo', 'asdhsadhsabdhsabdhsadbhasdbashdbsahdashdasdvasgdvagsdvasgvdasgvdasgdvgasvdasbdhasdgvsagd', '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email_address` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `type` varchar(45) NOT NULL,
  `createdOn` datetime NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `aboutMe` varchar(500) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `company` varchar(45) DEFAULT NULL,
  `school` varchar(45) DEFAULT NULL,
  `hometown` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `languages` varchar(45) DEFAULT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email_address`, `password`, `type`, `createdOn`, `name`, `phoneNumber`, `aboutMe`, `country`, `company`, `school`, `hometown`, `gender`, `languages`, `first_name`, `last_name`) VALUES
(1, 't1', '$2a$10$fAq1EL1rbO7YF1YKlDIgyONDu5I.j.WAiyvGZYSCzl8atBCPuGvaC', 'traveller', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 't1', 'p1'),
(2, 'ox', '$2a$10$fAq1EL1rbO7YF1YKlDIgyO0aRrjswt2HEMiJxWCD/HkCPlYUDvHQW', 'traveller', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'o1', 'pi'),
(3, 'o1', '$2a$10$fAq1EL1rbO7YF1YKlDIgyONDu5I.j.WAiyvGZYSCzl8atBCPuGvaC', 'owner', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'o1', 'p1'),
(4, 'o2', '$2a$10$fAq1EL1rbO7YF1YKlDIgyO/bELq3XZ65CvLf1ZnhlioQjjVQE9u8.', 'owner', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'o2', 'p2'),
(5, 'o3', '$2a$10$fAq1EL1rbO7YF1YKlDIgyOBOYGxV2oBt3INDQDcmZxRDxDIWlVpYG', 'owner', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'o3', 'p3'),
(6, 't2', '$2a$10$a6QxmnDyNqwCoSmzsjBgguVaJXMn5rYdXRWIY5AUiG32J//EEpSqm', 'traveller', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 't2', 'p2'),
(7, 'john.wasnik@sjsu.edu', '$2a$10$a6QxmnDyNqwCoSmzsjBgguCc/znzLOX293ffCgkiY2mF4R9Xcr7Pm', 'traveller', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'John', 'john'),
(8, 'mathew.j@sjsu.edu', '$2a$10$fC3i3oeSj9mLytqIjFiD2eNhDTg9ANu2YYGcf0V4NPbTE/GIzUdkO', 'owner', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Mathew', 'mat');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_details`
--
ALTER TABLE `property_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `property_details`
--
ALTER TABLE `property_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
