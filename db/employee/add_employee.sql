INSERT INTO employees
(   first_name, 
    last_name, 
    email,
    password,
    title)
VALUES
($1,$2,$3,$4,$5)
RETURNING id;