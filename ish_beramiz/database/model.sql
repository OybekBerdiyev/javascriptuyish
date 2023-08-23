CREATE TABLE users (
    users_id serial PRIMARY KEY,
    name varchar(64),
    email varchar(64) UNIQUE,
    password text,
    wallet float NOT NULL,
    isActive BOOLEAN DEFAULT TRUE
);

CREATE TABLE services (
    service_id serial PRIMARY KEY,
    title varchar(64) not null,
    description text not null,
    service_photo text,
    users_id int,
    price float not null,
    isActive BOOLEAN DEFAULT TRUE,
    foreign KEY(users_id) references users(users_id)
);

