
CREATE DATABASE yuvalreches
    DEFAULT CHARACTER SET 'utf8';
ALTER DATABASE yuvalreches CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE yuvalreches;


CREATE TABLE `users` (
    `id`       INT          NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(150) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `phone`    VARCHAR(150) NOT NULL,
    `email`    VARCHAR(150) NOT NULL,
    `score`    INT                   DEFAULT 0,
    PRIMARY KEY (id)
);


CREATE TABLE `city` (
    `id`   INT          NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `category` (
    `id`   INT          NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE `items` (
    `id`          INT          NOT NULL AUTO_INCREMENT,
    `user_id`     INT          NOT NULL,
    `date`        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `title`       VARCHAR(150) NOT NULL,
    `description` VARCHAR(250),
    `city_id`     INT          NOT NULL,
    `category_id` INT          NOT NULL,
    `delivered`   TINYINT(1)            DEFAULT 0,
    PRIMARY KEY (id),
    KEY `user_idx` (`user_id`) USING BTREE,
    KEY `city_idx` (`city_id`) USING BTREE,
    KEY `cat_idx` (`category_id`) USING BTREE,
    CONSTRAINT `fk_users_user_id` FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT `fk_city_city_id` FOREIGN KEY (city_id) REFERENCES city (id),
    CONSTRAINT `fk_category_category_id` FOREIGN KEY (category_id) REFERENCES category (id)
);


CREATE TABLE `item_search` (
    `item_id` INT          NOT NULL,
    `title`   VARCHAR(150) NOT NULL,
    PRIMARY KEY (item_id),
    FULLTEXT KEY `idx_item_search_title` (`title`)
)
    ENGINE = MyISAM;


CREATE TABLE `tags` (
    `id`   INT          NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `item_tags` (
    `id`          INT NOT NULL AUTO_INCREMENT,
    `item_id`     INT NOT NULL,
    `tag_id`      INT NOT NULL,
    `user_id`     INT NOT NULL,
    `numOfAccept` INT          DEFAULT 0,
    `numOfDeny`   INT          DEFAULT 0,
    PRIMARY KEY (id),
    KEY `item_tags_tag_idx` (`tag_id`) USING BTREE,
    KEY `item_tags_item_idx` (`item_id`) USING BTREE,
    KEY `item_tags_user_idx` (`user_id`) USING BTREE,
    CONSTRAINT `fk_item_tags_tag_id` FOREIGN KEY (tag_id) REFERENCES tags (id),
    CONSTRAINT `fk_item_tags_item_id` FOREIGN KEY (item_id) REFERENCES items (id),
    CONSTRAINT `fk_item_tags_user_id` FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE `tags_replied_history` (
    `id`      INT NOT NULL AUTO_INCREMENT,
    `item_tag_id`  INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (id),
    KEY `tag_history_user_idx` (`user_id`) USING BTREE,
    CONSTRAINT `fk_tag_history_user_id` FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT `fk_tag_history_tag_id` FOREIGN KEY (item_tag_id) REFERENCES item_tags (id)
);

CREATE TABLE `item_request` (
    `id`            INT       NOT NULL AUTO_INCREMENT,
    `item_id`       INT       NOT NULL,
    `requester_id`  INT       NOT NULL,
    `request_date`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `is_approved`   TINYINT(1)         DEFAULT 0,
    `is_denied`     TINYINT(1)         DEFAULT 0,
    `response_date` TIMESTAMP          DEFAULT 0,
    PRIMARY KEY (id),
    KEY `item_request_item_idx` (`item_id`) USING BTREE,
    KEY `item_request_requester_idx` (`requester_id`) USING BTREE,
    CONSTRAINT `fk_requests_item_id` FOREIGN KEY (item_id) REFERENCES items (id),
    CONSTRAINT `fk_requests_user_id` FOREIGN KEY (requester_id) REFERENCES users (id)
);

CREATE TABLE `wish_list` (
    `id`            INT       NOT NULL AUTO_INCREMENT,
    `user_id`       INT       NOT NULL,
    `tag_id`      INT       NOT NULL,
    `request_date`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `is_notified`   TINYINT(1)         DEFAULT 0,
    PRIMARY KEY (id),
    KEY `wish_list_tag_idx` (tag_id) USING BTREE,
    KEY `wish_list_requester_idx` (`user_id`) USING BTREE,
    CONSTRAINT `fk_wish_list_tag_id` FOREIGN KEY (tag_id) REFERENCES tags (id),
    CONSTRAINT `fk_wish_list_user_id` FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE `item_report` (
    `id`      INT       NOT NULL AUTO_INCREMENT,
    `user_id` INT       NOT NULL,
    `item_id` INT       NOT NULL,
    `date`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `handled` TINYINT(1)         DEFAULT 0,
    PRIMARY KEY (id),
    KEY `item_report_item_idx` (`item_id`) USING BTREE,
    KEY `item_report_requester_idx` (`user_id`) USING BTREE,
    CONSTRAINT `fk_report_item_id` FOREIGN KEY (item_id) REFERENCES items (id),
    CONSTRAINT `fk_report_user_id` FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE `images` (
    `id`      INT  NOT NULL AUTO_INCREMENT,
    `item_id` INT  NOT NULL,
    `image`   BLOB NOT NULL,
    PRIMARY KEY (id),
    KEY `images_item_idx` (`item_id`) USING BTREE,
    CONSTRAINT `fk_images_item_id` FOREIGN KEY (item_id) REFERENCES items (id)
);


CREATE TABLE `push_notifications` (
    `id`              INT    NOT NULL AUTO_INCREMENT,
    `user_id`         INT    NOT NULL,
    `device_token_id` BIGINT NOT NULL,
    PRIMARY KEY (id),
    KEY `push_notification_requester_idx` (`user_id`) USING BTREE,
    CONSTRAINT `fk_push_notification_user_id` FOREIGN KEY (user_id) REFERENCES users (id)
);



