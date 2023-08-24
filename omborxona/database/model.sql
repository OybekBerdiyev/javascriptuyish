CREATE TABLE workers (
    worker_id serial not null primary key,
    fullname varchar(100) not null,
    email varchar(64) unique not null,
    password text not null, 
    role boolean default false,
    isactive boolean default true
);


insert into workers(fullname,email,password)values('Kimdur','kimdur@gmail.com','qwerty');

CREATE TABLE categores ( 
    category_id serial not null,
    name varchar(100) not null,
    isactive boolean default true,
    primary key (category_id)
);

insert into categores(name)values('Mevalar');

CREATE TABLE products (
    product_id serial not null primary key,
    name varchar(46) not null,
    kg float not null,
    price float not null,
    category_id int references categores(category_id), 
    isactive boolean default true
);

insert into products(name,kg,price)values('olma',10.0,5.0);

UPDATE products SET name='apelsen',kg=15,price=40 where product_id=1;

CREATE TABLE histories ( 
    history_id serial not null,
    worker_id int not null,
    product_id int not null,
    is_sell boolean not null, 
    kg float not null,
    price float not null,
    created_at timestamp default current_timestamp,
    foreign key (worker_id) references workers(worker_id), 
    foreign key (product_id) references products(product_id) 
);



create function history_event()
returns TRIGGER
language plpgsql as
$$
    BEGIN
    insert into histories(worker_id,product_id,is_sell,kg,price) values(1,NEW.product_id,true,NEW.kg,NEW.price);
    return NEW;
    END;
$$;


create trigger row_trig
AFTER UPDATE
on products
for each row
execute procedure history_event();