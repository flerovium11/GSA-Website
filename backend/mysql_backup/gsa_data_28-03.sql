-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Mrz 2024 um 10:07
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `gsa_data`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `login_token` varchar(255) DEFAULT NULL,
  `salt` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `email`, `password`, `login_token`, `salt`) VALUES
(1, 'ennio', 'enniobinder@gmail.com', '$2y$10$HmIjMtbaEMpSpXCcWDgP2O7AC9nQbsywtyo.7PatHafUM6ssNLd2q', '$2y$10$ASuGWpb6dS4tNPG3xPdUAOa3OYFQo7h1NJbUO5Tyzbn26lH49m.yG', 'ahdie827cd'),
(4, 'maris', 'maris@maris.maus', '$2y$10$CsOALnRBsI7rCpCmDbjYTO0pDNJezUL16UdxGZvnHXGjnw8sYDpti', '$2y$10$X5SWLH/M5SAgvLNwX2v8YOulc4H5SdzJ4ZD0Dbp6TZYnE4wUYb6kq', 'mbysebwaxf');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `blogpost`
--

CREATE TABLE `blogpost` (
  `blogpost_id` int(11) NOT NULL,
  `string_id` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `description` text NOT NULL,
  `title_image` text NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `blogpost`
--

INSERT INTO `blogpost` (`blogpost_id`, `string_id`, `content`, `description`, `title_image`, `post_date`, `admin_id`) VALUES
(6, 'kgsvq', '<h1>Blogtitel 2</h1>\n    <p>Jegliches HTML-Markup wird unterstützt</p>\n    <blockquote>Probier die verschiedenen Ansichten und Werkzeuge in der Toolbar aus!</blockquote>\n    <h3>Bilder können über Links eingefügt werden (Für eigene Bilder einfach nach \"image hosting\" googlen</h3>\n    <img src=\"https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg\"/>\n<img src=\"https://i.ibb.co/bz7GkmY/Screenshot-2024-02-25-220852.png\"/>\n<img src=\"https://i.ibb.co/bz7GkmY/Screenshot-2024-02-25-220852.png\"/>\n<img src=\"https://i.ibb.co/bz7GkmY/Screenshot-2024-02-25-220852.png\"/>', 'Das ist ein Testblog, den müssen wir später wieder löschen', 'https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg', '2024-03-27 16:19:53', 1),
(7, 'wmrhm', '<h1>BROT JAAAA</h1>\n    <p>Jegliches HTML-Markup wird unterstützt</p>\n    <blockquote>Probier die verschiedenen Ansichten und Werkzeuge in der Toolbar aus!</blockquote>\n    <h3>Bilder können über Links eingefügt werden (Für eigene Bilder einfach nach \"image hosting\" googlen</h3>\n    <img src=\"https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg\"/>\n        ', 'Das ist mein cooler blog', 'https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg', '2024-03-27 23:06:44', 1),
(8, 'ukilf', '<h1>Blogtitteeeell 51</h1>\n    <p>Jegliches HTML-Markup wird unterstützt</p>\n    <blockquote>Probier die verschiedenen Ansichten und Werkzeuge in der Toolbar aus!</blockquote>\n    <h3>Bilder können über Links eingefügt werden (Für eigene Bilder einfach nach \"image hosting\" googlen</h3>\n    <img src=\"https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg\"/>\n        ', 'das ist der blog 51', 'https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg', '2024-03-27 23:09:20', 1),
(9, 'ehege', '<h1>Ein extrem langer Blogtitel</h1>\n    <p>Jegliches HTML-Markup wird unterstützt</p>\n    <blockquote>Probier die verschiedenen Ansichten und Werkzeuge in der Toolbar aus!</blockquote>\n    <h3>Bilder können über Links eingefügt werden (Für eigene Bilder einfach nach \"image hosting\" googlen</h3>\n    <img src=\"https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg\"/>\n        ', 'hi', 'https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg', '2024-03-27 23:11:01', 1),
(10, 'hwqvk', '\n<h1>Dieser Titel ist extreeem lang</h1>', 'Diese Beschreibung ist extrem lang, sie hat sogar genau die maximale länge, die eine Beschreibung haben darf. Damit will ich schauen, was mit dem Text', '', '2024-03-28 08:49:10', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `blogpost_reaction`
--

CREATE TABLE `blogpost_reaction` (
  `br_id` int(11) NOT NULL,
  `blogpost_id` int(11) NOT NULL,
  `reaction_id` int(11) NOT NULL,
  `reaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `blogpost_reaction`
--

INSERT INTO `blogpost_reaction` (`br_id`, `blogpost_id`, `reaction_id`, `reaction_date`) VALUES
(57, 6, 2, '2024-03-27 23:06:16');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reaction`
--

CREATE TABLE `reaction` (
  `reaction_id` int(11) NOT NULL,
  `reaction_name` varchar(50) NOT NULL,
  `reaction_content` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `reaction`
--

INSERT INTO `reaction` (`reaction_id`, `reaction_name`, `reaction_content`) VALUES
(1, 'clap', '👏'),
(2, 'party', '🥳'),
(3, 'laugh', '😂'),
(4, 'angry', '😡');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indizes für die Tabelle `blogpost`
--
ALTER TABLE `blogpost`
  ADD PRIMARY KEY (`blogpost_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indizes für die Tabelle `blogpost_reaction`
--
ALTER TABLE `blogpost_reaction`
  ADD PRIMARY KEY (`br_id`),
  ADD KEY `blogpost_id` (`blogpost_id`),
  ADD KEY `reaction_id` (`reaction_id`);

--
-- Indizes für die Tabelle `reaction`
--
ALTER TABLE `reaction`
  ADD PRIMARY KEY (`reaction_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `blogpost`
--
ALTER TABLE `blogpost`
  MODIFY `blogpost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `blogpost_reaction`
--
ALTER TABLE `blogpost_reaction`
  MODIFY `br_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT für Tabelle `reaction`
--
ALTER TABLE `reaction`
  MODIFY `reaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `blogpost`
--
ALTER TABLE `blogpost`
  ADD CONSTRAINT `blogpost_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints der Tabelle `blogpost_reaction`
--
ALTER TABLE `blogpost_reaction`
  ADD CONSTRAINT `blogpost_reaction_ibfk_1` FOREIGN KEY (`reaction_id`) REFERENCES `reaction` (`reaction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blogpost_reaction_ibfk_2` FOREIGN KEY (`blogpost_id`) REFERENCES `blogpost` (`blogpost_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
