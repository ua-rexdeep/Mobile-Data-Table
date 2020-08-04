CREATE TABLE IF NOT EXISTS `accounts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) COLLATE utf8_bin NOT NULL,
  `password` varchar(32) COLLATE utf8_bin NOT NULL,
  `department` int(11) NOT NULL DEFAULT '0',
  `badge` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT '0',
  `preDept` varchar(124) COLLATE utf8_bin DEFAULT NULL,
  `rank` varchar(64) COLLATE utf8_bin NOT NULL,
  `phone` varchar(64) COLLATE utf8_bin NOT NULL,
  `sign` varchar(64) COLLATE utf8_bin NOT NULL,
  `pedName` varchar(64) COLLATE utf8_bin NOT NULL,
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `access` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT 'new',
  `warns` json NOT NULL,
  `isAdmin` int(1) NOT NULL DEFAULT '0',
  `reputation` float NOT NULL DEFAULT '0',
  `discord` varchar(64) CHARACTER SET utf32 COLLATE utf32_bin NOT NULL,
  `2fa` int(1) NOT NULL DEFAULT '0',
  `gameID` int(5) NOT NULL DEFAULT '0',
  `meta` int(64) NOT NULL DEFAULT '0',
  `actions` json NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE IF NOT EXISTS `dbTable` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(1) NOT NULL DEFAULT '0',
  `Data` json NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE IF NOT EXISTS `wanted` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` int(1) NOT NULL DEFAULT '0',
  `Data` json NOT NULL,
  `Status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;