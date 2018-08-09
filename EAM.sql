USE EAM;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


DROP TABLE IF EXISTS `movies`;
		
CREATE TABLE `movies` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `title_alternate` VARCHAR(255),
  `release_date` DATE NOT NULL,
  `run_time` TIME NOT NULL,
  `poster` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `studios`;
		
CREATE TABLE `studios` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `established` DATE NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `photo` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `actors`;
		
CREATE TABLE `actors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name_first` VARCHAR(255) NOT NULL,
  `name_last` VARCHAR(255) NULL,
  `birthdate` DATE NOT NULL,
  `birth_place` VARCHAR(255) NOT NULL,
  `head_shot` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);



DROP TABLE IF EXISTS `directors`;
		
CREATE TABLE `directors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name_first` VARCHAR(255) NOT NULL,
  `name_last` VARCHAR(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `birth_place` VARCHAR(255) NOT NULL,
  `photo` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);



DROP TABLE IF EXISTS `writers`;
		
CREATE TABLE `writers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name_first` VARCHAR(255) NOT NULL,
  `name_last` VARCHAR(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `birth_place` VARCHAR(255) NOT NULL,
  `photo` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `genres`;
		
CREATE TABLE `genres` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `photo` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `movies_actors`;
		
CREATE TABLE `movies_actors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_movie` INTEGER NOT NULL,
  `id_actor` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `movies_studios`;
		
CREATE TABLE `movies_studios` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_movie` INTEGER NOT NULL,
  `id_studio` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `movies_genres`;
		
CREATE TABLE `movies_genres` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_movie` INTEGER NOT NULL,
  `id_genre` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `movies_writers`;
		
CREATE TABLE `movies_writers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_movie` INTEGER NOT NULL,
  `id_writer` INTEGER NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `movies_directors`;
		
CREATE TABLE `movies_directors` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_movie` INTEGER NOT NULL,
  `id_director` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `episodes`;
		
CREATE TABLE `episodes` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_movie` INTEGER NOT NULL,
  `release_date` DATE NOT NULL,
  `photo` TEXT DEFAULT NULL,
  `link` Text DEFAULT NULL
  PRIMARY KEY (`id`)
);

ALTER TABLE `movies_actors` ADD FOREIGN KEY (id_movie) REFERENCES `movies` (`id`);
ALTER TABLE `movies_actors` ADD FOREIGN KEY (id_actor) REFERENCES `actors` (`id`);
ALTER TABLE `movies_studios` ADD FOREIGN KEY (id_movie) REFERENCES `movies` (`id`);
ALTER TABLE `movies_studios` ADD FOREIGN KEY (id_studio) REFERENCES `studios` (`id`);
ALTER TABLE `movies_genres` ADD FOREIGN KEY (id_movie) REFERENCES `movies` (`id`);
ALTER TABLE `movies_genres` ADD FOREIGN KEY (id_genre) REFERENCES `genres` (`id`);
ALTER TABLE `movies_writers` ADD FOREIGN KEY (id_movie) REFERENCES `movies` (`id`);
ALTER TABLE `movies_writers` ADD FOREIGN KEY (id_writer) REFERENCES `writers` (`id`);
ALTER TABLE `movies_directors` ADD FOREIGN KEY (id_movie) REFERENCES `movies` (`id`);
ALTER TABLE `movies_directors` ADD FOREIGN KEY (id_director) REFERENCES `directors` (`id`);
ALTER TABLE `episodes` ADD FOREIGN KEY (id_movie) REFERENCES `movies` (`id`);



-- ALTER TABLE `Movie` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Studio` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Actor` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Director` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Writer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Genre` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Movie_Actor` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Movie_Studio` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Movie_Genre` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Movie_Writer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Movie_Director` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Episode` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
