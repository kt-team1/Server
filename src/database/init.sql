create database kt CHARACTER SET utf8 COLLATE utf8_general_ci;
use kt;

-- mysql -uroot -p1234 < 寃쎈�?\init.sql

create table user(
    user_id int(10) NOT NULL AUTO_INCREMENT,
    phone varchar(30),
    PRIMARY KEY(user_id)
)DEFAULT CHARSET= utf8;

create table exhibition(
    exhibit_id int(10) NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    place varchar(200) NOT NULL,
    address varchar(255),
    date varchar(100),
    time varchar(100),
    price varchar(255),
    poster varchar(255),
    info TEXT(255),
    PRIMARY KEY(exhibit_id)
)DEFAULT CHARSET= utf8;

create table online_art(
    exhibit_id int(10) NOT NULL,
    title varchar(100) NOT NULL,
    author varchar(100),
    poster varchar(255),
    date varchar(10),
    info TEXT(255),
    index1 int(10),
    index2 int(10),
    index3 int(10),
    PRIMARY KEY(exhibit_id)
)DEFAULT CHARSET= utf8;

create table online(
    id int(10) NOT NULL AUTO_INCREMENT,
    user_id int(10) NOT NULL,
    exhibit_id int(10) NOT NULL,
    date varchar(255) NOT NULL,
    number int(10) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(exhibit_id) REFERENCES exhibition(exhibit_id)
)DEFAULT CHARSET= utf8;

create table search(
    search_id int(10) NOT NULL AUTO_INCREMENT,
    user_id int(10) NOT NULL,
    exhibit_id int(10) NOT NULL,
    grade int(10),
    PRIMARY KEY(search_id),
    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(exhibit_id) REFERENCES exhibition(exhibit_id)
)DEFAULT CHARSET=utf8;

create table picture(
    pic_id int(10) NOT NULL AUTO_INCREMENT,
    exhibit_id int(10) NOT NULL,
    title varchar(100),
    author varchar(30),
    date varchar(30),
    info TEXT(255),
    img varchar(255),
    cluster_id int(10),
    PRIMARY KEY(pic_id),
    FOREIGN KEY(exhibit_id) REFERENCES online_art(exhibit_id)
)DEFAULT CHARSET = utf8;

create table address_xy(
    id int(10) NOT NULL AUTO_INCREMENT,
    place varchar(200) NOT NULL,
    address varchar(255),
    x float(10),
    y float(10),
    PRIMARY KEY(id)
)DEFAULT CHARSET = utf8;

create table seouladdress(
    address_id int(10) NOT NULL,
    gu varchar(10),
    dong varchar(10),
    ro varchar(10),
    PRIMARY KEY(address_id)
)DEFAULT CHARSET = utf8;

create table subway(
    line varchar(10) NOT NULL,
    station varchar(30) NOT NULL,
    gu varchar(10),
    dong varchar(10),
    ro varchar(10),
    PRIMARY KEY(line, station)
)DEFAULT CHARSET = utf8;


