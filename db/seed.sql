create table helo_users (
    user_id serial primary key,
    username varchar(100) not null,
    password varchar(100) not null,
    profile_pic text
);

create table helo_posts (
    post_id serial primary key,
    title varchar(45) not null,
    content text,
    img text,
    author_id int references helo_users(user_id),
    date_created timestamp
);
