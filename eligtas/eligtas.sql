-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 14, 2019 at 03:10 AM
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
-- Table structure for table `emergencies`
--

CREATE TABLE IF NOT EXISTS `emergencies` (
`emergencies_id` int(8) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `request_lat` double NOT NULL,
  `request_long` double NOT NULL,
  `request_status_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `emergencies`
--

INSERT INTO `emergencies` (`emergencies_id`, `name`, `type`, `request_lat`, `request_long`, `request_status_id`) VALUES
(2, 'Cebu North General Hospital', 'Hospital', 10.3734794, 123.912345, 1),
(3, 'Tipolo Fire Station', 'Fire Station', 10.3329464, 123.9254359, 2),
(5, 'Police Station 4', 'Police Station', 10.3124281, 123.9136362, 0);

-- --------------------------------------------------------

--
-- Table structure for table `logtrail`
--

CREATE TABLE IF NOT EXISTS `logtrail` (
`log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action_datetime` datetime NOT NULL,
  `action` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logtrail`
--

INSERT INTO `logtrail` (`log_id`, `user_id`, `action_datetime`, `action`) VALUES
(41, 0, '0000-00-00 00:00:00', ''),
(42, 0, '2019-01-11 05:15:27', 'Report'),
(43, 0, '0000-00-00 00:00:00', ''),
(44, 52, '2019-01-11 05:16:16', 'Report'),
(45, 0, '0000-00-00 00:00:00', ''),
(46, 52, '2019-01-11 05:17:19', 'Report'),
(47, 0, '0000-00-00 00:00:00', ''),
(48, 0, '0000-00-00 00:00:00', ''),
(49, 0, '2019-01-11 05:35:31', 'Report'),
(50, 0, '0000-00-00 00:00:00', ''),
(51, 52, '2019-01-11 05:35:55', 'Report'),
(52, 0, '0000-00-00 00:00:00', ''),
(53, 0, '2019-01-11 05:36:47', 'Report'),
(54, 0, '0000-00-00 00:00:00', ''),
(55, 0, '2019-01-11 05:37:43', 'Report'),
(56, 0, '0000-00-00 00:00:00', ''),
(57, 0, '2019-01-11 05:40:58', 'Report'),
(58, 0, '0000-00-00 00:00:00', ''),
(59, 54, '2019-01-11 06:05:41', 'Respond'),
(60, 0, '0000-00-00 00:00:00', ''),
(61, 0, '2019-01-11 06:45:08', 'Report'),
(62, 0, '0000-00-00 00:00:00', ''),
(63, 52, '2019-01-11 08:42:02', 'Report'),
(64, 0, '0000-00-00 00:00:00', ''),
(65, 0, '2019-01-11 08:51:35', 'Report'),
(66, 0, '0000-00-00 00:00:00', ''),
(67, 0, '2019-01-14 02:05:08', 'Report');

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
  `special_needs` text NOT NULL,
  `request_lat` double NOT NULL,
  `request_long` double NOT NULL,
  `request_status_id` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`request_id`, `request_type_id`, `person_to_check`, `event`, `persons_injured`, `persons_trapped`, `other_info`, `special_needs`, `request_lat`, `request_long`, `request_status_id`) VALUES
(51, 2, 'fgh', 'fgh', 12, 12, 'dfgd', 'fdfg', 10.3456807, 123.9274584, 0),
(62, 1, 'asd', 'sad', 22, 22, 'sad', 'asd', 10.3384433, 123.909274, 0),
(63, 1, 'lacion', 'lacion', 233, 323, 'sdasad', 'asdasd', 10.3758086, 123.9551046, 0),
(65, 1, 'asdas', 'sdas', 21, 21, 'sdasd', 'asdad', 10.3626495, 123.879499, 0),
(66, 2, 'asdf', 'asdf', 12, 12, 'asdf', 'asdf', 10.3647881, 123.8777749, 0),
(96, 1, '', 'Crime', 123, 23, 'acasa', 'visually impaired, ', 10.3522064, 123.9129154, 0),
(98, 1, '', 'Earthquake', 2, 3, 'nj', 'visually impaired, ', 10.3522064, 123.9129154, 0),
(100, 1, '', 'Crime', 1, 1, '1213', 'visually impaired, with mental health issues', 0, 0, 0),
(102, 1, '', 'Crime', 1, 1, '1asd', 'visually impaired, unable to walk, with mental health issues', 10.362482930145, 123.91639345296, 0),
(104, 1, '', 'Earthquake', 1, 1, 'asd', 'visually impaired, ', 10.353916567813, 123.91497506469, 0),
(106, 1, '', 'Earthquake', 1, 1, 'as', 'visually impaired, cannot hear well, ', 10.362159851084, 123.91788661829, 0);

-- --------------------------------------------------------

--
-- Table structure for table `request_status`
--

CREATE TABLE IF NOT EXISTS `request_status` (
`request_status_id` int(1) NOT NULL,
  `request_status` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_email`, `regUser_id`, `specUser_id`, `user_delete`, `request_id`) VALUES
(52, 'nj', 'nj123', 'njompad@gmail.com', 1, 1, 0, 30),
(54, 'kaabay', '123', 'njjessayenelijah@gmail.com', 1, 2, 0, 51);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emergencies`
--
ALTER TABLE `emergencies`
 ADD PRIMARY KEY (`emergencies_id`);

--
-- Indexes for table `logtrail`
--
ALTER TABLE `logtrail`
 ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `reguser`
--
ALTER TABLE `reguser`
 ADD PRIMARY KEY (`regUser_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
 ADD PRIMARY KEY (`request_id`), ADD KEY `request_type_id` (`request_type_id`), ADD KEY `request_status_id` (`request_status_id`);

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
-- AUTO_INCREMENT for table `emergencies`
--
ALTER TABLE `emergencies`
MODIFY `emergencies_id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `logtrail`
--
ALTER TABLE `logtrail`
MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT for table `reguser`
--
ALTER TABLE `reguser`
MODIFY `regUser_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
MODIFY `request_id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `request_status`
--
ALTER TABLE `request_status`
MODIFY `request_status_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `request_type`
--
ALTER TABLE `request_type`
MODIFY `request_type_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `specuser`
--
ALTER TABLE `specuser`
MODIFY `specUser_id` int(1) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=55;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `request`
--
ALTER TABLE `request`
ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`request_type_id`) REFERENCES `request_type` (`request_type_id`),
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
