-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 29. Mrz 2025 um 11:42
-- Server-Version: 10.5.19-MariaDB-0+deb11u2
-- PHP-Version: 8.1.31

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
(1, 'ennio', 'enniobinder@gmail.com', '$2y$10$N9VJim1baOQcTV4pavhJHOjWmlYh5Cs5gEEHN8oFCTjrHG5W.ZFU.', '$2y$10$96NyPzSJ97uTwl6IEBbmEuf1q.Duwwhf3LnHcWl4d4giUGHpEHgc6', 'ahdie827cd'),
(4, 'maris', 'maris@maris.maus', '$2y$10$wYkdB5GGBEcAliWNjtavpuB75bKIeqHW08gtFJDVAmnE4TL6TTt2G', '$2y$10$fCz03.AeawmLP4vxXrWQke9Qzh2Po54wUyOO3lagCfT8/cYnMVDLS', 'mbysebwaxf'),
(5, 'simeon', 'milanberger001@gmail.com', '$2y$10$YxaP0kq5IofvTHW9T/PpTO/J9dj2o.6et0ABnEFnMPrH4UyBe2KNK', '$2y$10$.JZTICvJszpHUYsohU1j7Ori5DkLeegAew2QcZdInxvE2Uw7qgfie', 'jyctuveexm'),
(6, 'tanja', 'milanberger001@gmail.com', '$2y$10$09LBGcJV24o15TGar/OLnu.G9gUl5ehtM0RYoJc.Cfuv8GL4IaboG', '$2y$10$TEigi30Z0d6yLDdcK2WJ5uUF1xJeLliMjneogTocOLqbssf5HW/xy', 'gmqwquikdl'),
(7, 'robert', 'milanberger001@gmail.com', '$2y$10$UaKvI1VDiaKLvPwuIRPn1.YmOBta5OOB2GJGpDWWaBTTbCo22yum2', '$2y$10$gzeA1bBI5nCoZQQz8a.7GuOFsD7w7INQAw/Z0uRYd6fxY.uQBA4AK', 'ggsnijexlz'),
(8, 'amelie', 'milanberger001@gmail.com', '$2y$10$IaVMXvI3Toh.CSmiSSuw/uqvTGzeC6CB4fGm02ck8b6ezWFWbVQaa', NULL, 'bovpszwode');

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
(14, 'ewxka', '<h1>Droptests</h1>\n<p>Am 26. 03. hatten wir die tolle Möglichkeit, noch kurz vor dem Finale Droptests von einem ca. 30m hohen Gebäude beim Hatschek Zementwerk Gmunden zu machen.</p>\n<br>\n<img src=\"https://i.postimg.cc/Jz9km1H6/IMG-4505-1.jpg\">\n<br>\n<p>\nInsgesamt haben wir drei erfolgreiche Droptests durchgeführt. Wir haben unter anderem die Fallgeschwindigkeit, die Signalübertragung und Sensoren getestet.\n<br>\n<br>\nWir sind sehr dankbar für diese exklusive Chance und freuen uns schon sehr auf das österreichische CanSat-Finale!\n </p>       \n        ', 'Am 26. 03. hatten wir die tolle Möglichkeit, noch kurz vor dem Finale Droptests beim Hatschek Zementwerk Gmunden zu machen.', 'https://i.postimg.cc/Jz9km1H6/IMG-4505-1.jpg', '2024-03-31 16:24:59', 4),
(16, 'emfdr', '<h1> Endspurt </h1>\n\nDas Finale steht kurz bevor, und die Aufregung liegt förmlich in der Luft. Jeden Tag wird unser Cansat intensiv getestet. Trotz der zahlreichen Erfolge, die wir verbuchen können, tauchen gelegentlich unerwartete, teilweise mysteriöse Fehler auf. Doch dank unserer Expertise können wir sie erfolgreich lösen.\n\nWir gehen definitiv mit Zuversicht und Entschlossenheit auf das Finale zu und freuen uns, diese Erfahrung machen zu können.', 'Das Finale steht vor der Tür!', 'https://i.ibb.co/WvRKRxL/20240322-201810.jpg', '2024-03-31 22:08:13', 7),
(18, 'lzgjf', '<h1>Das Finale</h1>\n  <p>Voller Aufregung und Vorfreude machten wir uns am Mittwoch, den 03.04.2024, mit dem Zug auf den Weg nach Linz zum ersten Tag des dreitägigen Finales. <br><br>\nNach unserer Ankunft im Ars Electronica um 13:30 erhielten wir einen Überblick über die Abläufe. Anschließend folgte eine kurze Vorstellungsrunde der Teams. <br><br>\nDer Hauptbestandteil des Mittwochs war der Drop Test und die Technische Abnahme. \nZuerst wurde der Fallschirm mit einem Dummy-Modell von ca. 9 m Höhe fallen gelassen und die Geschwindigkeit berechnet. Nachher wurden alle Technischen Daten erfasst und das „Innenleben“ inspiziert. Anschließend hatten wir bis 20:00 Uhr Zeit, um eventuelle Verbesserungen vorzunehmen und den CanSat final für den Raketenstart am nächsten Tag abzugeben. Wir qualifizierten uns für den Raketenstart!\n</p><br><br>\n<p>Nach einer 1,5-stündigen Busfahrt erreichten wir um 9:20 den Flugplatz Suben in Schärding. Hier wurde es nun richtig ernst. Wir bekamen für eine kurze Zeit unsere CanSats zurück, um noch einmal letzte Tests durchzuführen. Danach ging es für uns und 4 andere Teams raus aufs Flugfeld zum Aufbauen der Bodenstation und ans Falten des Fallschirms. Nach einer Fehlzündung seitens der Rakete ging es dann doch noch hoch in den Himmel hinauf und im Steilflug zurück zum Boden. Für uns hieß es nun nur noch Zuschauen und hoffen, alle Daten zu empfangen. Während wir uns unser Mittagessen schmecken ließen und erste Daten auswerteten, startete eine zweite Rakete mit den restlichen 5 Teams. Nach der Rückreise ins Ars Electronica hatten wir erneut Zeit die Daten auszuwerten und die PowerPoint für die Abschlusspräsentation fertigzustellen. Um 19:00 Uhr gab es ein gemeinsames Abendessen. <br><br>\nMorgen werden wir unser Projekt und unsere Erkenntnisse vor der Fachjury präsentieren. Anhand dessen wird entschieden, wer der Hauptgewinner des CanSat-Wettbewerbs 2024 wird. Zusätzlich gibt es auch noch 4 Nebenpreise zu gewinnen. Drückt uns die Daumen!\n</p>\n<img src=\"https://i.ibb.co/x6sGX5S/Bild2.png\">\n<br>\n<img src=\"https://i.ibb.co/NVTnXZD/Bild1.png\">\n        ', 'Voller Aufregung und Vorfreude machten wir uns am Mittwoch, den 03.04.2024, mit dem Zug auf den Weg nach Linz zum ersten Tag des dreitägigen Finales. ', 'https://i.ibb.co/NVTnXZD/Bild1.png', '2024-04-04 22:05:17', 6),
(19, 'soghd', '<h1>Fallschirm-Flug aufs Siegertreppchen</h1>\n\n <p>\nNach einem ereignisreichen Tag am Flugplatz Suben ging es für unser Team am Abend bis ins frühe Morgengrauen an das Auswerten der Daten und das Erstellen der Abschlusspräsentation. <br>\n<a href=\"https://gsa.bplaced.net/results\">(Hier zu den Ergebnissen)\n</a>\n</p>\n\n<p>\nAm Freitag, dem Tag der Entscheidung, durften wir zurück ins <i>Ars Electronica Center</i>, wo alle Teams ihr Projekt und die finalen Auswertungen einer Jury präsentierten. \n</p>\n\n<img src=\"https://i.ibb.co/Sdp0Zp1/pr-sentation.jpg\"> <br>\n\n<p>\nNach einem Beratungsgespräch seitens der Jury und einer Pause für uns, wurde es <b>ernst</b>. Die Entscheidungen wurden verkündet: \n\n<blockquote>Wir haben unter 13 anderen Teams aus Österreich den ersten Platz gewonnen! 🥳\n</blockquote>\n\n</p>\n<img src=\"https://i.ibb.co/n83TRNm/urkunden-auf-treppe.jpg\"><br><br>\nFür uns geht es nun im Juni weiter nach Holland zum <i>Europäischen Weltraumforschungs- und Technologiezentrum (ESTEC)</i>  zu „Space Engineer for a day“. <br>🚀🚀🚀\n</p>\n<img src=\"https://i.ibb.co/ZdFBnNX/alle-teilnehmer-innen.jpg\">\n', 'Unser Team gewinnt unter 13 Teams den ersten Platz und reist im Juni nach Holland zum ESTEC für \"Space Engineer for a day\". 🚀', 'https://i.ibb.co/n83TRNm/urkunden-auf-treppe.jpg', '2024-05-20 10:39:03', 1);

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
(178, 16, 2, '2024-04-01 07:51:10'),
(183, 16, 2, '2024-04-01 12:10:47'),
(184, 16, 2, '2024-04-01 16:26:11'),
(186, 16, 1, '2024-04-01 19:57:06'),
(187, 16, 1, '2024-04-01 21:30:27'),
(188, 16, 1, '2024-04-01 21:30:31'),
(189, 16, 2, '2024-04-01 21:31:01'),
(222, 16, 1, '2024-04-05 14:43:49'),
(225, 16, 1, '2024-04-08 07:13:03'),
(228, 14, 1, '2024-04-19 05:28:23'),
(229, 14, 2, '2024-04-19 05:28:44'),
(230, 14, 1, '2024-04-19 05:28:46'),
(236, 18, 1, '2024-05-20 10:46:10'),
(239, 18, 1, '2024-05-20 10:46:16'),
(242, 18, 2, '2024-06-14 11:12:22'),
(243, 18, 1, '2024-06-14 11:12:23'),
(244, 18, 2, '2024-06-14 11:12:27'),
(246, 19, 2, '2024-06-23 15:36:54'),
(248, 18, 6, '2024-06-24 13:31:45'),
(251, 16, 1, '2024-07-08 08:18:13'),
(253, 18, 1, '2024-10-05 16:19:27'),
(254, 18, 4, '2024-10-05 16:19:29'),
(255, 18, 1, '2024-10-05 16:19:30'),
(256, 19, 1, '2024-10-05 16:20:04'),
(257, 14, 1, '2024-10-05 16:20:33'),
(258, 14, 1, '2024-10-25 19:12:26'),
(259, 14, 2, '2024-10-25 19:12:27'),
(260, 14, 3, '2024-10-25 19:12:28'),
(262, 14, 6, '2024-10-25 19:12:29'),
(263, 14, 1, '2024-10-25 19:13:03'),
(264, 14, 4, '2024-10-25 19:13:53');

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
(4, 'hide', '🫣'),
(6, 'fire', '🔥');

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `blogpost`
--
ALTER TABLE `blogpost`
  MODIFY `blogpost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT für Tabelle `blogpost_reaction`
--
ALTER TABLE `blogpost_reaction`
  MODIFY `br_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT für Tabelle `reaction`
--
ALTER TABLE `reaction`
  MODIFY `reaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
