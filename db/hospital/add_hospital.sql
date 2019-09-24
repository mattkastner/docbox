INSERT INTO hospitals
(   name, 
    address_line, 
    city, 
    state, 
    zip, 
    country,
    contact)
VALUES
($1,$2,$3,$4,$5,$6,$7)
RETURNING id;