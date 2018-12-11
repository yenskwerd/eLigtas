-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 11, 2018 at 01:51 PM
-- Server version: 5.6.21
-- PHP Version: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eligtas`
--

-- --------------------------------------------------------

--
-- Table structure for table `reguser`
--

CREATE TABLE IF NOT EXISTS `reguser` (
`regUser_id` int(1) NOT NULL,
  `regUser_name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reguser`
--

INSERT INTO `reguser` (`regUser_id`, `regUser_name`) VALUES
(1, 'Regular User');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE IF NOT EXISTS `request` (
`request_id` int(8) NOT NULL,
  `request_type_id` int(1) NOT NULL,
  `person_to_check` varchar(100) DEFAULT NULL,
  `event` varchar(100) NOT NULL,
  `persons_injured` int(5) DEFAULT NULL,
  `persons_trapped` int(5) DEFAULT NULL,
  `other_info` text NOT NULL,
  `special_needs_id` int(8) DEFAULT NULL,
  `request_lat` double NOT NULL,
  `request_long` double NOT NULL,
  `request_status_id` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_id`, `request_type_id`, `person_to_check`, `event`, `persons_injured`, `persons_trapped`, `other_info`, `special_needs_id`, `request_lat`, `request_long`, `request_status_id`) VALUES
(1, 1, 'yenyen', 'fire', 10, 10, 'lolol', NULL, 10.3502881, 123.8988732, 1),
(3, 3, 'nj ', 'earthquake', 10, 10, 'asdjfhaskjdfhkjh', NULL, 10.320476, 123.9092109, 2),
(7, 1, 'jessa', 'fire', 10, 10, 'alksjfdlkasdjf', NULL, 10.3512881, 123.8988932, 0);

-- --------------------------------------------------------

--
-- Table structure for table `request_status`
--

CREATE TABLE IF NOT EXISTS `request_status` (
`request_status_id` int(1) NOT NULL,
  `request_status` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_status`
--

INSERT INTO `request_status` (`request_status_id`, `request_status`) VALUES
(0, 'Call for help'),
(1, 'On the way'),
(2, 'Rescued');

-- --------------------------------------------------------

--
-- Table structure for table `request_type`
--

CREATE TABLE IF NOT EXISTS `request_type` (
`request_type_id` int(1) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request_type`
--

INSERT INTO `request_type` (`request_type_id`, `name`) VALUES
(1, 'Report Event'),
(2, 'Call For Help'),
(3, 'Please Check On');

-- --------------------------------------------------------

--
-- Table structure for table `specialneeds`
--

CREATE TABLE IF NOT EXISTS `specialneeds` (
`specialneeds_id` int(8) NOT NULL,
  `visually_impaired` tinyint(1) NOT NULL DEFAULT '0',
  `cannot_hear_well` tinyint(1) NOT NULL DEFAULT '0',
  `unable_to_walk` tinyint(1) NOT NULL DEFAULT '0',
  `with_mental_health_issue` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `specuser`
--

CREATE TABLE IF NOT EXISTS `specuser` (
`specUser_id` int(1) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specuser`
--

INSERT INTO `specuser` (`specUser_id`, `name`) VALUES
(1, 'First Responder'),
(2, 'PDCAT User'),
(3, 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`user_id` int(8) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `regUser_id` int(1) NOT NULL,
  `specUser_id` int(1) DEFAULT NULL,
  `user_delete` int(1) NOT NULL DEFAULT '0',
  `request_id` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_email`, `regUser_id`, `specUser_id`, `user_delete`, `request_id`) VALUES
(1, 'elijah', 'elijah321', 'ronelijahruiz@gmail.com', 1, 1, 0, 0),
(2, 'elijah1', 'elijah321', 'asdfasdfasdf@gmail.com', 1, 2, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reguser`
--
ALTER TABLE `reguser`
 ADD PRIMARY KEY (`regUser_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
 ADD PRIMARY KEY (`request_id`), ADD KEY `request_type_id` (`request_type_id`), ADD KEY `special_needs_id` (`special_needs_id`), ADD KEY `request_status_id` (`request_status_id`);

--
-- Indexes for table `request_status`
--
ALTER TABLE `request_status`
 ADD PRIMARY KEY (`request_status_id`);

--
-- Indexes for table `request_type`
--
ALTER TABLE `request_type`
 ADD PRIMARY KEY (`request_type_id`);

--
-- Indexes for table `specialneeds`
--
ALTER TABLE `specialneeds`
 ADD PRIMARY KEY (`specialneeds_id`);

--
-- Indexes for table `specuser`
--
ALTER TABLE `specuser`
 ADD PRIMARY KEY (`specUser_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`user_id`), ADD KEY `regUser_id` (`regUser_id`), ADD KEY `specUser_id` (`specUser_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reguser`
--
ALTER TABLE `reguser`
MODIFY `regUser_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
MODIFY `request_id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `request_status`
--
ALTER TABLE `request_status`
MODIFY `request_status_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `request_type`
--
ALTER TABLE `request_type`
MODIFY `request_type_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `specialneeds`
--
ALTER TABLE `specialneeds`
MODIFY `specialneeds_id` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `specuser`
--
ALTER TABLE `specuser`
MODIFY `specUser_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `request`
--
ALTER TABLE `request`
ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`request_type_id`) REFERENCES `request_type` (`request_type_id`),
ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`special_needs_id`) REFERENCES `specialneeds` (`specialneeds_id`),
ADD CONSTRAINT `request_ibfk_3` FOREIGN KEY (`request_status_id`) REFERENCES `request_status` (`request_status_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`regUser_id`) REFERENCES `reguser` (`regUser_id`),
ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`specUser_id`) REFERENCES `specuser` (`specUser_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
