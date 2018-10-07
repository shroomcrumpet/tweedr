


CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT
);




CREATE TABLE IF NOT EXISTS tweets (
	id SERIAL PRIMARY KEY,
	author_id INTEGER,
	author_username TEXT,
	content TEXT,
	created_at TIMESTAMP,
	edited_at TIMESTAMP
);




-- CREATE TABLE IF NOT EXISTS users_following (
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER,
-- 	tweet_id INTEGER
-- );



--run from Terminal: psql -d tweedr -U kencheng -f tables.sql