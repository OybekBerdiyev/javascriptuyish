CREATE DATABASE referal;

CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password text NOT NULL,
    wallet FLOAT NOT NULL DEFAULT 0,
    is_collabrator BOOLEAN DEFAULT FALSE,
    isactive BOOLEAN DEFAULT TRUE
);


CREATE TABLE company (
    company_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(64),
    user_id INT REFERENCES users(user_id),
    isactive BOOLEAN DEFAULT TRUE
);


CREATE TABLE product(
    product_id  SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price float NOT NULL,
    promo_id int REFERENCES promo(promo_id),
    company_id INT NOT NULL REFERENCES company(company_id),
    isactive BOOLEAN DEFAULT TRUE
);



CREATE TABLE promo (
    promo_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(64),
    price_for_user FLOAT NOT NULL,
    company_id INT REFERENCES company(company_id),
    user_id INT REFERENCES users(user_id), 
    dead_time DATE NOT NULL,
    promo_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isactive BOOLEAN DEFAULT TRUE
);



CREATE TABLE promo_history (
    pro_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    promo_id INt NOT NULL
);


CREATE TABLE history (
    history_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    promo_id INT NOT NULL REFERENCES promo(promo_id),
    price FLOAT NOT NULL
);


CREATE TABLE collabs (
    collab_id SERIAL PRIMARY KEY,
    company_id int REFERENCES company(company_id)
    user_id int REFERENCES users(user_id),
);

CREATE function users_event()
returns TRIGGER
language plpgsql as
$$
    BEGIN
    UPDATE users SET wallet = wallet + NEW.price WHERE user_id=NEW.user_id;    
    return NEW;
    END;
$$; 

create trigger row_trig
AFTER INSERT
on history
for each row
execute procedure users_event();

create trigger row_trig2
AFTER UPDATE
on history
for each row
execute procedure users_event();





INSERT INTO users(name,email,password,wallet) VALUES ('kimdir','kimdir@gmail.com','nimadurlar',100.00);
INSERT INTO history (user_id,promo_id,price) VALUES (1,1,2.0);
INSERT INTO promo (name,price_for_user,company_id,user_id,dead_time)VALUES('OYBEK23',1.0,1,1,'2023-08-24T16:42:36.056Z');
INSERT INTO company (name) VALUES ('Bekorchilik group');