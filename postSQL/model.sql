

-- create table users(
--     id serial not null,
--     fullname varchar(64) not null,
--     username varchar(64) not null,
--     age int not null,
--     country varchar(64) not null,
--     isActive boolean default false,
--     createed_at timestamptz not null default current_timestamp
-- );

-- insert into users(fullname,username,age,country) value('Najimbey','najimxon',17,'Uzbekistan');

-- CREATE TABLE Company (
--     id serial not null,
--     company varchar(32) not null,
--     product varchar(32) not null,
--     buy_price int not null,
--     sell_price int not null
-- );


-- select company, MAX(buy_price) AS max_buy_price FROM Company GROUP BY company ORDER BY max_buy_price DESC;


-- create table hokim (
--     id serial not null PRIMARY KEY,
--     name varchar not null
-- );

-- create table viloyat (
--     id int PRIMARY KEY,
--     name varchar,
--     hokim_id int,
--     FOREIGN KEY(hokim_id)
--     REFERENCES hokim(id)
-- );



-- create table oshpaz (
--     id serial not null PRIMARY KEY,
--     name varchar not null
-- );

-- create table ovqat (
--     id int PRIMARY KEY,
--     name varchar,
--     oshpaz_id int,
--     FOREIGN KEY(oshpaz_id)
--     REFERENCES oshpaz(id)
-- );


create table cars (
    id serial not null PRIMARY KEY,
    name varchar not null
);

create table masters (
    id serial not null PRIMARY KEY,
    name varchar not null
);

create table car_master (
    id int PRIMARY KEY,
    master_id int,
    car_id int,
    FOREIGN KEY(master_id)
    REFERENCES masters(id),
    FOREIGN KEY(car_id)
    REFERENCES cars(id)
);



CREATE TABLE users (
    id serial not null,
    name varchar(32) not null,
    username varchar(32) not null,
    password text
);


INSERT INTO users (name,username,password) values('kindir','kimdir.uz','qwerty');

ALTER USER Oybek WITH PASSWORD '1111';


pgexercises.com/questions/basic/where//.html