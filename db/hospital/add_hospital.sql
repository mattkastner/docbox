INSERT INTO hospitals
(   name, 
    address_line, 
    city, 
    state, 
    zip, 
    country)
VALUES
($1,$2,$3,$4,$5,$6)
RETURNING id;