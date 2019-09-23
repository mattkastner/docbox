CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT,
    profile_img BYTEA,
    title TEXT
)